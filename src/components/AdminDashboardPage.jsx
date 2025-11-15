// src/components/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Button 
} from '@mui/material';
import { API_URLS } from '../apiConfig';
import { useNavigate } from 'react-router-dom';

// Import Icons cho các thẻ
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Icon Doanh thu
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'; // Icon Sản phẩm

// Hàm định dạng tiền tệ
const formatCurrency = (number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

// Component con cho mỗi Thẻ Thống Kê (Stat Card)
function StatCard({ title, value, icon, color }) {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        height: '100%',
        borderRadius: '12px' // Bo tròn góc
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          borderRadius: '50%', 
          backgroundColor: color, 
          color: 'white', 
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}

// Component con cho Trạng thái Đơn hàng
function StatusChip({ status }) {
  let color;
  if (status === 'Hoàn thành') color = 'success';
  else if (status === 'Đang vận chuyển') color = 'warning';
  else if (status === 'Đã hủy') color = 'error';
  else color = 'primary'; // Chờ xác nhận

  return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
}

// Trang Dashboard chính
function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');
      try {
        // Gọi song song 2 API
        const [statsRes, ordersRes] = await Promise.all([
          fetch(API_URLS.ADMIN_DASHBOARD_STATS),
          fetch(API_URLS.ADMIN_GET_ALL_ORDERS)
        ]);

        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();

        setStats(statsData);
        // Lấy 5 đơn hàng gần nhất
        if (Array.isArray(ordersData)) {
          setRecentOrders(ordersData.slice(0, 5));
        }

        setLoading(false);
      } catch (err) {
        console.error("Lỗi fetch dashboard:", err);
        setError('Không thể tải dữ liệu thống kê.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4 }}>
        Tổng Quan
      </Typography>

      {/* Hàng 1: Các thẻ thống kê */}
      {stats && (
        <Grid container spacing={3}>
          {/* Thẻ Doanh thu Hôm nay */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Doanh thu Hôm nay" 
              value={formatCurrency(stats.today.revenue)} 
              icon={<MonetizationOnIcon />}
              color="#1976d2" // Xanh dương
            />
          </Grid>
          
          {/* Thẻ Sản phẩm Hôm nay */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Sản phẩm Hôm nay" 
              value={stats.today.products || 0} 
              icon={<ShoppingBagIcon />}
              color="#2e7d32" // Xanh lá
            />
          </Grid>
          
          {/* Thẻ Doanh thu Tháng này */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Doanh thu Tháng này" 
              value={formatCurrency(stats.month.revenue)} 
              icon={<MonetizationOnIcon />}
              color="#ed6c02" // Cam
            />
          </Grid>
          
          {/* Thẻ Sản phẩm Tháng này */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Sản phẩm Tháng này" 
              value={stats.month.products || 0} 
              icon={<ShoppingBagIcon />}
              color="#d32f2f" // Đỏ
            />
          </Grid>
        </Grid>
      )}

      {/* Hàng 2: Đơn hàng gần đây */}
      {/* SỬA: Thêm sx={{ mt: 4 }} để tạo khoảng cách */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Đơn Hàng Gần Đây
              </Typography>
              <Button 
                variant="outlined"
                size="small"
                onClick={() => navigate('/admin/don-hang')}
              >
                Xem tất cả
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mã ĐH</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Khách Hàng</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tổng Tiền</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ngày Đặt</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow 
                      key={order.id_donhang}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>#{order.id_donhang}</TableCell>
                      <TableCell>{order.hoten}</TableCell>
                      <TableCell>{formatCurrency(order.tongtien)}</TableCell>
                      <TableCell>{new Date(order.ngaytao).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        <StatusChip status={order.trangthai} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default AdminDashboardPage;