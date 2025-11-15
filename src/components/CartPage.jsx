// src/components/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Typography, Box, Button, Grid, Paper, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.gia * item.quantity), 0);
  };

  const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal());

  return (
    <Container sx={{ py: 5, minHeight: '70vh' }}>
      <Typography variant="h3" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Giỏ Hàng Của Bạn
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Giỏ hàng đang trống.</Typography>
          <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
            Tiếp tục mua sắm
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Cột trái: Danh sách sản phẩm */}
          <Grid item xs={12} md={8}>
            {cartItems.map(item => (
              <Paper key={item.id_sanpham} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                <img src={`/Upload/${item.hinhanh}`} alt={item.tensp} width="100" height="100" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <Typography variant="h6">{item.tensp}</Typography>
                  <Typography>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id_sanpham, e.target.value)} 
                    style={{ width: '50px', textAlign: 'center', marginRight: '10px' }}
                    min="1"
                  />
                  <IconButton onClick={() => removeFromCart(item.id_sanpham)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Grid>

          {/* Cột phải: Tổng kết */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Tổng cộng
              </Typography>
              <Typography variant="h4" sx={{ color: '#33524b', fontWeight: 'bolder', mb: 3 }}>
                {formattedTotal}
              </Typography>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                onClick={() => navigate('/thanh-toan')}
                sx={{ 
                  backgroundColor: '#33522d', 
                  '&:hover': { backgroundColor: '#284123' },
                  fontSize: '1.1rem'
                }}
              >
                Tiếp tục thanh toán
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartPage;