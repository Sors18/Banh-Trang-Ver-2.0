// src/components/ArticleCard.jsx
import React from 'react';
import { Grid, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ArticleCard({ article }) {
  const titleStyle = { color: '#601d1b', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', '&:hover': { color: '#bd784e' } };

  return (
    <Grid container spacing={4} sx={{ mb: 5 }}>
      {/* SỬA: Thêm /Media/ vào trước image */}
      {article.image && (
        <Grid item xs={12} md={4}>
          <Box component="img" src={`/Media/${article.image}`} alt={article.title} sx={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} />
        </Grid>
      )}
      <Grid item xs={12} md={article.image ? 8 : 12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link component={RouterLink} to={`/tin-tuc/${article.id}`} sx={titleStyle}>
          {article.title}
        </Link>
        <Typography sx={{ color: '#bc7b4d', fontSize: '17px', fontWeight: 400, mt: 1 }}>
          {article.excerpt}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default ArticleCard;