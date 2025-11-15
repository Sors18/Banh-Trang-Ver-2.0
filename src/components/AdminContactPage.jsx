// src/components/AdminContactPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import { API_URLS } from '../apiConfig';

function AdminContactPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.ADMIN_GET_CONTACTS);
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
      setLoading(false);
    } catch (err) {
      setError('Lỗi tải danh sách tin nhắn.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  
  // (Chúng ta có thể thêm API và nút để cập nhật trạng thái "Đã đọc" sau)

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Hòm Thư Liên Hệ
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Họ Tên</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SĐT</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nhà hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Lời nhắn</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ngày gửi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id} sx={{ '&:hover': { backgroundColor: '#ffe4e1' } }}>
                <TableCell>{msg.hoten}</TableCell>
                <TableCell>{msg.sdt}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.nhahang}</TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: '300px', overflow: 'auto' }}>
                    {msg.loinhan}
                  </Box>
                </TableCell>
                <TableCell>{new Date(msg.ngaygui).toLocaleString('vi-VN')}</TableCell>
                <TableCell>
                  <Chip label={msg.trangthai} color={msg.trangthai === 'Mới' ? 'primary' : 'default'} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminContactPage;