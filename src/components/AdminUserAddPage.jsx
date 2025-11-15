// src/components/AdminUserAddPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Button,
  TextField, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

function AdminUserAddPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: 0 // Mặc định là 'User'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.password) {
      showNotification('Vui lòng nhập mật khẩu.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URLS.ADMIN_ADD_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        showNotification('Thêm người dùng thành công!', 'success');
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

  return (
    <Container maxWidth="md">
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ maxWidth: '600px', margin: '50px auto', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Thêm Người Dùng Mới
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
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
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
              {loading ? <CircularProgress size={24} /> : 'Thêm Người Dùng'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminUserAddPage;