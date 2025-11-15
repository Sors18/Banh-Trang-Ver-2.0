// src/components/AdminNewsAddPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Button,
  TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

function AdminNewsAddPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured: 0 // 0 = false, 1 = true
  });
  const [hinhAnhFile, setHinhAnhFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFileChange = (e) => {
    setHinhAnhFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!hinhAnhFile) {
      showNotification('Vui lòng chọn hình ảnh.', 'error');
      setLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('excerpt', formData.excerpt);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('featured', formData.featured);
    formDataToSubmit.append('hinhanh', hinhAnhFile);

    try {
      const response = await fetch(API_URLS.ADMIN_ADD_NEWS, {
        method: 'POST',
        body: formDataToSubmit, 
      });
      const data = await response.json();
      
      if (data.success) {
        showNotification('Thêm tin tức thành công!', 'success');
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

  return (
    <Container maxWidth="md">
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ maxWidth: '800px', margin: '50px auto', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Thêm Tin Tức Mới
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
              value={formData.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={10}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Chọn Hình Ảnh
              <input type="file" name="hinhanh" hidden accept="image/*" onChange={handleFileChange} required />
            </Button>
            {hinhAnhFile && <Typography sx={{ ml: 2, display: 'inline' }}>{hinhAnhFile.name}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.featured == 1}
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
              {loading ? <CircularProgress size={24} /> : 'Thêm Tin Tức'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminNewsAddPage;