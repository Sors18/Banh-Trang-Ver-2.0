// src/components/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext'; // <-- 1. IMPORT HOOK MỚI

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Thêm navigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showNotification } = useNotification(); // <-- 2. LẤY HÀM THÔNG BÁO

  useEffect(() => {
    // --- BẮT ĐẦU ĐIỀN LẠI LOGIC ---
    setLoading(true);
    fetch(`${API_URLS.PRODUCTS}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error("Lỗi fetch chi tiết:", err);
        setLoading(false);
      });
    // --- KẾT THÚC ĐIỀN LẠI LOGIC ---
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // alert('Đã thêm sản phẩm vào giỏ hàng!'); // <-- 3. XÓA DÒNG NÀY
      
      // 4. THAY BẰNG DÒNG NÀY (ĐẸP HƠN)
      showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    }
  };

  // --- BẮT ĐẦU ĐIỀN LẠI LOGIC ---
  const formattedPrice = product ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia) : '';

  if (loading) { 
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10, minHeight: '50vh' }}><CircularProgress /></Box>;
  }

  if (!product || product.length === 0) { 
    return (
      <Container sx={{ my: 5, textAlign: 'center', minHeight: '50vh' }}>
        <Typography variant="h4">Không tìm thấy sản phẩm</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Quay về Trang chủ
        </Button>
      </Container>
    );
  }
  // --- KẾT THÚC ĐIỀN LẠI LOGIC ---

  return (
    <Box sx={{ background: '#f9f9f9' }}>
      <Container sx={{ py: 5 }}>
        <Box sx={{ background: '#fff', p: 4, borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
          <Grid container spacing={4}>
            {/* --- BẮT ĐẦU ĐIỀN LẠI LOGIC --- */}
            {/* Cột ảnh bên trái */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={`/Upload/${product.hinhanh}`}
                alt={product.tensp}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            </Grid>

            {/* Cột thông tin bên phải */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#601d1b' }}>
                {product.tensp}
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: '#a17a6d', fontSize: '1rem', mb: 2, textTransform: 'uppercase' }}>
                Danh mục: {product.danhmuc}
              </Typography>
              <Typography variant="h4" sx={{ color: '#33524b', fontWeight: 'bolder', mb: 3 }}>
                {formattedPrice}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 4, whiteSpace: 'pre-wrap' }}>
                {product.mota}
              </Typography>
              {/* --- KẾT THÚC ĐIỀN LẠI LOGIC --- */}
              
              <Button 
                variant="contained" 
                size="large"
                onClick={handleAddToCart} // 5. GỌI HÀM NÀY
                sx={{ 
                  backgroundColor: '#33522d', 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  padding: '10px 24px',
                  '&:hover': {
                    backgroundColor: '#284123'
                  }
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDetailPage;