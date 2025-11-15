// src/components/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// SỬA: Đã import đầy đủ Grid, Paper, TextField
import { Container, Typography, Box, TextField, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext'; // Import hook thông báo

function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification(); // Lấy hàm thông báo

  const [customerInfo, setCustomerInfo] = useState({
    hoten: '',
    diachi: '',
    sdt: '',
  });

  // Tự động điền tên nếu người dùng đã đăng nhập
  useEffect(() => {
    if (user) {
      setCustomerInfo(prev => ({ ...prev, hoten: user.username }));
    }
  }, [user]);

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      showNotification('Giỏ hàng của bạn đang trống.', 'warning');
      return;
    }

    if (!customerInfo.hoten || !customerInfo.diachi || !customerInfo.sdt) {
      showNotification('Vui lòng điền đầy đủ thông tin giao hàng.', 'warning');
      return;
    }

    const orderData = {
      customerInfo,
      cartItems,
      userId: user ? user.id : null,
    };

    try {
      const response = await fetch(API_URLS.CHECKOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();

      if (data.success) {
        clearCart(); 
        showNotification('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.', 'success');
        navigate(user ? '/don-hang' : '/');
      } else {
        showNotification(data.message, 'error');
      }
    } catch (err) {
      showNotification('Lỗi kết nối máy chủ. Vui lòng thử lại.', 'error');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ my: 5, minHeight: '70vh' }}>
        <Typography variant="h3" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Thông Tin Giao Hàng
        </Typography>

        {/* --- SỬA: THÊM LẠI TOÀN BỘ FORM BÊN DƯỚI --- */}
        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="hoten"
                name="hoten"
                label="Họ và Tên"
                value={customerInfo.hoten}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="diachi"
                name="diachi"
                label="Địa chỉ giao hàng"
                value={customerInfo.diachi}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="sdt"
                name="sdt"
                label="Số điện thoại"
                value={customerInfo.sdt}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              mt: 3,
              backgroundColor: '#33522d',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#284123' },
              fontSize: '1.1rem'
            }}
          >
            Hoàn tất Đơn hàng
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default CheckoutPage;