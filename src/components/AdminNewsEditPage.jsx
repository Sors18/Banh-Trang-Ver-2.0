// src/components/AdminNewsEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  TextField, Grid, FormControlLabel, Checkbox
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

function AdminNewsEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured: 0,
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Tải dữ liệu tin cần sửa
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URLS.NEWS}?id=${id}`) // Dùng API news.php
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setFormData(data);
        } else {
          setError('Không tìm thấy tin tức.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Lỗi tải dữ liệu tin tức.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      featured: e.target.checked ? 1 : 0
    });
  };

  // 3. Xử lý khi nhấn nút "Cập nhật"
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    // API này không xử lý upload ảnh, chỉ gửi text JSON
    try {
      const response = await fetch(API_URLS.ADMIN_UPDATE_NEWS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: id }), // Gửi cả ID
      });
      const data = await response.json();
      
      if (data.success) {
        showNotification('Cập nhật tin tức thành công!', 'success');
        navigate('/admin/tin-tuc');
      } else {
        showNotification(data.message, 'error');
      }
    } catch (err) {
      showNotification('Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) {
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
        sx={{ maxWidth: '800px', margin: '50px auto', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Sửa Tin Tức (ID: {id})
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tiêu đề"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô tả ngắn (Excerpt)"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nội dung đầy đủ"
              name="content"
              value={formData.content || ''} // Xử lý nếu content là null
              onChange={handleChange}
              fullWidth
              multiline
              rows={10}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Hình ảnh hiện tại: {formData.image}</Typography>
            <Typography variant="caption" color="text.secondary">
              Việc thay đổi hình ảnh chưa được hỗ trợ trên giao diện này.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  // Phải ép kiểu về boolean
                  checked={Boolean(Number(formData.featured))} 
                  onChange={handleCheckChange}
                  name="featured"
                />
              }
              label="Đánh dấu là 'Tin Mới' (Hot)?"
            />
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
              {loading ? <CircularProgress size={24} /> : 'Cập Nhật Tin Tức'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminNewsEditPage;