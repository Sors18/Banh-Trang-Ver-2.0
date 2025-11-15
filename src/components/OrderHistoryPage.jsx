// src/components/OrderHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// SỬA: Import thêm các component Table và Button
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Import Link
import { API_URLS } from '../apiConfig';

function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/dang-nhap');
      return;
    }

    setLoading(true);
    // Gọi API (API này đã được cập nhật ở Phần 2)
    fetch(`${API_URLS.GET_ORDERS}?user_id=${user.id}`) 
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Lỗi tải lịch sử đơn hàng.');
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10, minHeight: '60vh' }}><CircularProgress /></Box>;
  }

  return (
    <Container sx={{ py: 5, minHeight: '70vh' }}>
      <Typography variant="h3" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Thông Tin Đơn Hàng
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      
      {orders.length === 0 ? (
        <Typography sx={{ textAlign: 'center' }}>Bạn chưa có đơn hàng nào.</Typography>
      ) : (
        // SỬA: Dùng Table để hiển thị giống file PHP
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#701c1c' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Họ Tên</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Địa Chỉ</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Số Điện Thoại</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tổng Tiền</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Thời Gian Đặt</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng Thái</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Chi Tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id_donhang} 
                  sx={{ 
                    '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#ffe4e1' } 
                  }}
                >
                  <TableCell>{order.hoten}</TableCell>
                  <TableCell>{order.diachi}</TableCell>
                  <TableCell>{order.sdt}</TableCell>
                  <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tongtien)}</TableCell>
                  <TableCell>{new Date(order.ngaytao).toLocaleString('vi-VN')}</TableCell>
                  <TableCell>{order.trangthai}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      component={RouterLink} // Dùng Link của React Router
                      to={`/don-hang/${order.id_donhang}`} // Link đến trang chi tiết
                      sx={{ 
                        backgroundColor: '#701c1c', 
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgb(139, 30, 30)' } 
                      }}
                    >
                      Xem Chi Tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default OrderHistoryPage;