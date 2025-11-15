// src/components/AdminProductEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  TextField, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

// Đây là map từ DB (file PHP của bạn) sang giá trị trong <select>
const categoryMap = {
  'Banhtrang': 'Banhtrang',
  'Salad': 'Salad',
  'Monannhe': 'Monannhe',
  'Mongachimlon': 'Mongachimlon',
  'Monca': 'Monca',
  'Trangmieng': 'Trangmieng'
};

function AdminProductEditPage() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const [product, setProduct] = useState({
    tensp: '',
    gia: '',
    mota: '',
    danhmuc: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Tải dữ liệu sản phẩm cần sửa
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URLS.PRODUCTS}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id_sanpham) {
          // Map giá trị danhmuc từ DB
          const dbCategoryKey = data.danhmuc.trim();
          setProduct({
            ...data,
            danhmuc: categoryMap[dbCategoryKey] || '' // Tìm giá trị khớp
          });
        } else {
          setError('Không tìm thấy sản phẩm.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Lỗi tải dữ liệu sản phẩm.');
        setLoading(false);
      });
  }, [id]);

  // 2. Xử lý khi thay đổi input
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 3. Xử lý khi nhấn nút "Sửa Sản Phẩm"
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    // (Bỏ qua xử lý upload ảnh)
    
    try {
      const response = await fetch(API_URLS.ADMIN_UPDATE_PRODUCT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id_sanpham,
          tensp: product.tensp,
          gia: product.gia,
          mota: product.mota,
          danhmuc: product.danhmuc
        }),
      });
      const data = await response.json();
      if (data.success) {
        showNotification('Cập nhật sản phẩm thành công!', 'success');
        navigate('/admin/san-pham'); // Quay về trang danh sách
      } else {
        showNotification(data.message, 'error');
      }
    } catch (err) {
      showNotification('Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product.tensp) {
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
        sx={{ 
          maxWidth: '600px', 
          margin: '50px auto', 
          padding: '20px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#701c1c', mb: 3 }}>
          Sửa Sản Phẩm
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
                {/* Giống hệt file update_sp.php của bạn */}
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
            <TextField
              label="Hình Ảnh (Tên file)"
              name="hinhanh"
              value={product.hinhanh}
              fullWidth
              disabled // Tạm thời vô hiệu hóa việc sửa ảnh
            />
            <Typography variant="caption" color="text.secondary">
              Việc thay đổi hình ảnh chưa được hỗ trợ trên giao diện này.
            </Typography>
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
              {loading ? <CircularProgress size={24} /> : 'Sửa Sản Phẩm'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminProductEditPage;