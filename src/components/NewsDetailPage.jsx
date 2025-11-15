// src/components/NewsDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Link, Breadcrumbs, CircularProgress } from '@mui/material';
import { API_URLS } from '../apiConfig'; // Import API URL

function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URLS.NEWS}?id=${id}`) // Gọi API
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error("Lỗi fetch chi tiết tin:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10, minHeight: '60vh' }}><CircularProgress /></Box>;
  }
  if (!article) {
    return <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}><Typography variant="h4">Không tìm thấy bài viết</Typography></Container>;
  }

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '80vh' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" sx={{ color: '#bc7b4d', textDecoration: 'none' }}>Trang chủ</Link>
          <Link component={RouterLink} to="/tin-tuc" sx={{ color: '#bc7b4d', textDecoration: 'none' }}>Tin tức</Link>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>
        <Box sx={{ background: '#fff', p: 4, borderRadius: '8px' }}>
          <Typography variant="h3" component="h1" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 2 }}>{article.title}</Typography>
          {article.image && (
            <Box component="img" src={`/Media/${article.image}`} alt={article.title} sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', mb: 3 }} />
          )}
          <Typography sx={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {article.content || article.excerpt}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
export default NewsDetailPage;