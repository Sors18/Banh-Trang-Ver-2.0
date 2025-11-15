// src/components/AdminOrderListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, // <-- SỬA: THÊM IMPORT NÀY
  Typography, 
  Box, 
  Paper, 
  CircularProgress, 
  Alert, 
  Button,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiConfig';

function AdminOrderListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hàm tải lại dữ liệu
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.ADMIN_GET_ALL_ORDERS);
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
      setLoading(false);
    } catch (err) {
      setError('Lỗi tải danh sách đơn hàng.');
      setLoading(false);
    }
  }, []);

  // Tải đơn hàng khi component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Hàm xử lý cập nhật trạng thái
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(API_URLS.ADMIN_UPDATE_ORDER_STATUS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, new_status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        // Tải lại danh sách sau khi cập nhật
        fetchOrders();
      } else {
        alert('Lỗi cập nhật: ' + data.message);
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ.');
    }
  };

  // Hàm xử lý hủy đơn
  const handleCancelOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      handleUpdateStatus(orderId, 'Đã hủy');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Quản Lý Đơn Hàng
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Họ Tên</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Địa Chỉ</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SĐT</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tổng Tiền</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Thời Gian Đặt</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành Động</TableCell>
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
                <TableCell>
                  {/* Hiển thị trạng thái */}
                  {order.trangthai === 'Hoàn thành' && <Typography color="green" sx={{fontWeight: 'bold'}}>Hoàn thành</Typography>}
                  {order.trangthai === 'Đã hủy' && <Typography color="error" sx={{fontWeight: 'bold'}}>Đã hủy</Typography>}
                  {order.trangthai === 'Chờ xác nhận' && <Typography color="blue" sx={{fontWeight: 'bold'}}>Chờ xác nhận</Typography>}
                  {order.trangthai === 'Đang vận chuyển' && <Typography color="orange" sx={{fontWeight: 'bold'}}>Đang vận chuyển</Typography>}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      onClick={() => navigate(`/admin/don-hang/${order.id_donhang}`)} // Link đến trang chi tiết
                    >
                      Chi Tiết
                    </Button>

                    {/* Nút Xử lý */}
                    {order.trangthai === 'Chờ xác nhận' && (
                      <>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="success"
                          onClick={() => handleUpdateStatus(order.id_donhang, 'Đang vận chuyển')}
                        >
                          Xác nhận
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="error"
                          onClick={() => handleCancelOrder(order.id_donhang)} // NÚT HỦY MỚI
                        >
                          Hủy
                        </Button>
                      </>
                    )}
                    {order.trangthai === 'Đang vận chuyển' && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="primary"
                        onClick={() => handleUpdateStatus(order.id_donhang, 'Hoàn thành')}
                      >
                        Hoàn thành
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminOrderListPage;