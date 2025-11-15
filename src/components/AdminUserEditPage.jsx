// src/components/AdminUserEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  TextField, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

function AdminUserEditPage() {
  const { id } = useParams(); // Lấy ID user từ URL
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    isAdmin: 0,
    password: '' // Để trống nếu không muốn đổi
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Tải dữ liệu user cần sửa
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URLS.ADMIN_USERS}?id=${id}`) // Dùng API admin_users.php?id=...
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setFormData({ ...data, password: '' }); // Tải dữ liệu, đặt pass rỗng
        } else {
          setError('Không tìm thấy người dùng.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Lỗi tải dữ liệu người dùng.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Xử lý khi nhấn nút "Cập nhật"
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(API_URLS.ADMIN_UPDATE_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: id }), // Gửi cả ID
      });
      const data = await response.json();
      
      if (data.success) {
        showNotification('Cập nhật người dùng thành công!', 'success');
        navigate('/admin/nguoi-dung');
      } else {
        showNotification(data.message, 'error');
      }
    } catch (err) {
      showNotification('Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.username) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Container sx={{ py: 5 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container maxWidth="md">
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ maxWidth: '600px', margin: '50px auto', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Sửa Người Dùng (ID: {id})
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tên đăng nhập"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mật khẩu mới"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              placeholder="Để trống nếu không muốn thay đổi"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="isAdmin-label">Quyền</InputLabel>
              <Select
                labelId="isAdmin-label"
                name="isAdmin"
                value={formData.isAdmin}
                label="Quyền"
                onChange={handleChange}
                // Không cho phép hạ quyền Super Admin (ID 1)
                disabled={id == 1}
              >
                <MenuItem value={0}>User</MenuItem>
                <MenuItem value={1}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              disabled={loading}
              sx={{ backgroundColor: '#701c1c', '&:hover': { backgroundColor: '#5a1515' } }}
            >
              {loading ? <CircularProgress size={24} /> : 'Cập nhật Người Dùng'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminUserEditPage;