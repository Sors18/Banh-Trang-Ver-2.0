// src/components/AdminOrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter 
} from '@mui/material';
import { API_URLS } from '../apiConfig';

// (Component này gần giống OrderDetailPage của user, nhưng gọi API Admin)
function AdminOrderDetailPage() {
  const { id } = useParams(); // Lấy 'id' (mã đơn hàng) từ URL
  const navigate = useNavigate();

  const [details, setDetails] = useState(null); // Thông tin chung
  const [items, setItems] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    // Gọi API chi tiết đơn hàng (của Admin)
    fetch(`${API_URLS.ADMIN_GET_ORDER_DETAILS}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDetails(data.order_details);
          setItems(data.order_items);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Lỗi tải chi tiết đơn hàng.');
        setLoading(false);
      });
  }, [id]);

  const total = items.reduce((sum, item) => sum + (item.gia_luc_mua * item.soluong), 0);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  if (error) {
     return <Container sx={{ py: 5 }}><Alert severity="error">{error}</Alert></Container>;
  }
  
  if (!details) {
     return <Container sx={{ py: 5 }}><Typography>Không tìm thấy đơn hàng.</Typography></Container>;
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        Chi Tiết Đơn Hàng #{details.id_donhang}
      </Typography>
       <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
         Trạng thái: <strong>{details.trangthai}</strong>
       </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hình Ảnh</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên Sản Phẩm</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Đơn Giá</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Số Lượng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Thành Tiền</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Địa Chỉ</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SĐT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#ffe4e1' } }}>
                <TableCell>
                  <img src={`/Upload/${item.hinhanh}`} width="80" alt={item.tensp} style={{ borderRadius: '4px' }} />
                </TableCell>
                <TableCell>{item.tensp}</TableCell>
                <TableCell>{new Intl.NumberFormat('vi-VN').format(item.gia_luc_mua)} ₫</TableCell>
                <TableCell>{item.soluong}</TableCell>
                <TableCell>{new Intl.NumberFormat('vi-VN').format(item.gia_luc_mua * item.soluong)} ₫</TableCell>
                <TableCell>{details.diachi}</TableCell>
                <TableCell>{details.sdt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#701c1c', textAlign: 'right' }}>
                Tổng Tiền:
              </TableCell>
              <TableCell colSpan={3} sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#701c1c' }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7} sx={{ textAlign: 'right' }}>
                 <Button 
                    variant="contained" 
                    onClick={() => navigate('/admin/don-hang')}
                    color="error"
                  >
                    Quay Lại
                  </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminOrderDetailPage;