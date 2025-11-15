// src/components/AdminProductAddPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Button,
  TextField, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

function AdminProductAddPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  // State cho các trường text
  const [product, setProduct] = useState({
    tensp: '',
    gia: '',
    mota: '',
    danhmuc: 'Banhtrang' // Đặt giá trị mặc định
  });
  // State riêng cho file
  const [hinhAnhFile, setHinhAnhFile] = useState(null);
  
  const [loading, setLoading] = useState(false);

  // 1. Xử lý khi thay đổi input text
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 2. Xử lý khi chọn file
  const handleFileChange = (e) => {
    setHinhAnhFile(e.target.files[0]); // Lấy file đầu tiên
  };

  // 3. Xử lý khi nhấn nút "Thêm"
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!hinhAnhFile) {
      showNotification('Vui lòng chọn hình ảnh.', 'error');
      setLoading(false);
      return;
    }

    // --- Dùng FormData vì có file ---
    const formData = new FormData();
    formData.append('tensp', product.tensp);
    formData.append('gia', product.gia);
    formData.append('mota', product.mota);
    formData.append('danhmuc', product.danhmuc);
    formData.append('hinhanh', hinhAnhFile); // Thêm file

    try {
      const response = await fetch(API_URLS.ADMIN_ADD_PRODUCT, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();
      
      if (data.success) {
        // CHỈ HIỂN THỊ THÔNG BÁO THÀNH CÔNG
        showNotification('Thêm sản phẩm thành công!', 'success');
        
        // VỀ TRANG QUẢN LÝ SẢN PHẨM
        navigate('/admin/san-pham'); 
      } else {
        // HIỂN THỊ THÔNG BÁO THẤT BẠI
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
        sx={{ 
          maxWidth: '600px', 
          margin: '50px auto', 
          padding: '20px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Thêm Sản Phẩm Mới
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="danhmuc-label">Danh Mục Sản Phẩm</InputLabel>
              <Select
                labelId="danhmuc-label"
                id="danhmuc"
                name="danhmuc"
                value={product.danhmuc}
                label="Danh Mục Sản Phẩm"
                onChange={handleChange}
              >
                <MenuItem value="Banhtrang">Bánh tráng</MenuItem>
                <MenuItem value="Salad">Salad-Rau</MenuItem>
                <MenuItem value="Monannhe">Món ăn nhẹ</MenuItem>
                <MenuItem value="Mongachimlon">Món gà-chim-lợn</MenuItem>
                <MenuItem value="Monca">Món cá</MenuItem>
                <MenuItem value="Trangmieng">Đồ uống - Tráng miệng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tên Sản Phẩm"
              name="tensp"
              value={product.tensp}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Giá (VNĐ)"
              name="gia"
              type="number"
              value={product.gia}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô Tả"
              name="mota"
              value={product.mota}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label" // Biến Button thành nhãn cho input
            >
              Chọn Hình Ảnh
              <input
                type="file"
                name="hinhanh"
                hidden
                accept="image/*" // Chỉ chấp nhận file ảnh
                onChange={handleFileChange}
                required
              />
            </Button>
            {/* Hiển thị tên file đã chọn */}
            {hinhAnhFile && <Typography sx={{ ml: 2, display: 'inline' }}>{hinhAnhFile.name}</Typography>}
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
              {loading ? <CircularProgress size={24} /> : 'Thêm Sản Phẩm'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminProductAddPage;