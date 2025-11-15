// src/components/AdminProductListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNotification } from '../context/NotificationContext'; // Dùng thông báo

function AdminProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Hàm tải lại dữ liệu
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.PRODUCTS); // Dùng API products.php
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
      setLoading(false);
    } catch (err) {
      setError('Lỗi tải danh sách sản phẩm.');
      setLoading(false);
    }
  }, []);

  // Tải sản phẩm khi component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hàm xử lý Xóa
  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(API_URLS.ADMIN_DELETE_PRODUCT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: productId }),
        });
        const data = await response.json();
        if (data.success) {
          showNotification('Xóa sản phẩm thành công!', 'success');
          fetchProducts(); // Tải lại danh sách
        } else {
          showNotification(data.message, 'error');
        }
      } catch (err) {
        showNotification('Lỗi kết nối máy chủ.', 'error');
      }
    }
  };

  // Hàm xử lý Sửa (Chuyển trang)
  const handleEdit = (productId) => {
    navigate(`/admin/san-pham/sua/${productId}`);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg">
      {/* TIÊU ĐỀ VÀ NÚT THÊM MỚI */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold' }}>
          Quản Lý Sản Phẩm
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/san-pham/them')} // Điều hướng đến trang thêm
        >
          Thêm Sản Phẩm
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {/* BẢNG HIỂN THỊ SẢN PHẨM */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Danh mục</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Giá</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mô tả</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id_sanpham} 
                sx={{ 
                  '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#ffe4e1' } 
                }}
              >
                <TableCell>
                  <img src={`/Upload/${product.hinhanh}`} width="100" height="100" alt={product.tensp} style={{ borderRadius: '8px', objectFit: 'cover' }} />
                </TableCell>
                <TableCell>{product.tensp}</TableCell>
                <TableCell>{product.danhmuc}</TableCell>
                <TableCell>{new Intl.NumberFormat('vi-VN').format(product.gia)} ₫</TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.mota}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(product.id_sanpham)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(product.id_sanpham)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminProductListPage;