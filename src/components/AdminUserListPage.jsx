// src/components/AdminUserListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, Typography, Box, Paper, CircularProgress, Alert, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext'; // Import Auth

function AdminUserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user: currentUser } = useAuth(); // Lấy user hiện tại đang đăng nhập

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.ADMIN_USERS);
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
      setLoading(false);
    } catch (err) {
      setError('Lỗi tải danh sách người dùng.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId, username) => {
    // KIỂM TRA BẢO MẬT: Không cho admin tự xóa mình
    if (currentUser && currentUser.id === userId) {
      showNotification('Bạn không thể tự xóa chính mình!', 'error');
      return;
    }
    
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${username}"?`)) {
      try {
        const response = await fetch(API_URLS.ADMIN_DELETE_USER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId }),
        });
        const data = await response.json();
        if (data.success) {
          showNotification(data.message, 'success');
          fetchUsers(); // Tải lại danh sách
        } else {
          showNotification(data.message, 'error');
        }
      } catch (err) {
        showNotification('Lỗi kết nối máy chủ.', 'error');
      }
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/nguoi-dung/sua/${userId}`);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold' }}>
          Quản Lý Người Dùng
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/nguoi-dung/them')}
        >
          Thêm Người Dùng
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên đăng nhập</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quyền</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#ffe4e1' } }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin == 1 ? (
                    <Chip label="Admin" color="success" size="small" />
                  ) : (
                    <Chip label="User" color="default" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(user.id, user.username)}
                    disabled={user.id === 1} // Vô hiệu hóa nút xóa cho ID 1 (Super Admin)
                  >
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

export default AdminUserListPage;