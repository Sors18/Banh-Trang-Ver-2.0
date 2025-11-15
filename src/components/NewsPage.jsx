// src/components/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Link, Breadcrumbs, Divider, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { API_URLS } from '../apiConfig'; // Import API URL

function NewsPage() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(API_URLS.NEWS) // Gọi API
      .then(res => res.json())
      .then(data => {
        setFeaturedPost(data.find(post => post.featured == 1));
        setOtherPosts(data.filter(post => post.featured == 0));
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi fetch tin tức:", err);
        setLoading(false);
      });
  }, []);

  const titleStyle = { color: '#601d1b', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', '&:hover': { color: '#bd784e' } };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10, minHeight: '60vh' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ background: '#fff', minHeight: '80vh' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3" component="h1" sx={{ color: '#601d1b', fontWeight: 'bold' }}>Tin Tức Sự Kiện</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ justifyContent: 'center', mt: 1 }}>
            <Link component={RouterLink} to="/" sx={{ color: '#bc7b4d', textDecoration: 'none' }}>Trang chủ</Link>
            <Typography color="text.primary">Tin tức</Typography>
          </Breadcrumbs>
          <Divider sx={{ width: '100px', height: '4px', backgroundColor: '#601d1b', margin: '20px auto' }} />
        </Box>
        {featuredPost && (
          <Box sx={{ textAlign: 'center', my: 5 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>🔥 Tin mới</Typography>
            <Link component={RouterLink} to={`/tin-tuc/${featuredPost.id}`} sx={titleStyle}>{featuredPost.title}</Link>
            <Typography sx={{ color: '#bc7b4d', fontSize: '17px', fontWeight: 400, mt: 1, maxWidth: '700px', margin: '10px auto' }}>
              {featuredPost.excerpt}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 5 }}>
          {otherPosts.map((post) => (
            <ArticleCard key={post.id} article={post} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
export default NewsPage;