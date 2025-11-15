// src/components/AdminNewsListPage.jsx
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

function AdminNewsListPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.NEWS); // Dùng API news.php
      const data = await response.json();
      if (Array.isArray(data)) {
        setNews(data);
      }
      setLoading(false);
    } catch (err) {
      setError('Lỗi tải danh sách tin tức.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDelete = async (newsId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        const response = await fetch(API_URLS.ADMIN_DELETE_NEWS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newsId }),
        });
        const data = await response.json();
        if (data.success) {
          showNotification('Xóa tin tức thành công!', 'success');
          fetchNews(); // Tải lại danh sách
        } else {
          showNotification(data.message, 'error');
        }
      } catch (err) {
        showNotification('Lỗi kết nối máy chủ.', 'error');
      }
    }
  };

  const handleEdit = (newsId) => {
    navigate(`/admin/tin-tuc/sua/${newsId}`);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold' }}>
          Quản Lý Tin Tức
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/tin-tuc/them')}
        >
          Thêm Tin Tức
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFF5D7', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#701c1c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tiêu đề</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mô tả ngắn</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tin mới (Hot)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((post) => (
              <TableRow key={post.id} sx={{ '&:hover': { backgroundColor: '#ffe4e1' } }}>
                <TableCell>{post.id}</TableCell>
                <TableCell>
                  {post.image ? (
                    <img src={`/Media/${post.image}`} width="100" height="100" alt={post.title} style={{ borderRadius: '8px', objectFit: 'cover' }} />
                  ) : (
                    'Không có ảnh'
                  )}
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.excerpt}
                  </Box>
                </TableCell>
                <TableCell>
                  {post.featured == 1 ? (
                    <Chip label="Tin Mới" color="error" size="small" />
                  ) : (
                    'Không'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(post.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(post.id)}>
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

export default AdminNewsListPage;