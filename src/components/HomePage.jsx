// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, ImageList, ImageListItem, ImageListItemBar, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // <-- 1. IMPORT LINK
import Slideshow from './Slideshow';
import ProductCard from './ProductCard'; // Dùng lại ProductCard
import { API_URLS } from '../apiConfig'; // Import API URL

// --- 2. THÊM LẠI DỮ LIỆU VÀ THÊM "path" ĐỂ LINK ---
const menuItems = [
  { img: '/Upload/Banh-trang-thit-heo-quay-600x600.jpg', title: 'BÁNH TRÁNG', rows: 2, cols: 2, path: '/thuc-don/banh-trang' },
  { img: '/Upload/Salad-rau-cang-cua-600x600.jpg', title: 'RAU - SALAD', cols: 2, path: '/thuc-don/rau-salad' },
  { img: '/Upload/Nom-sua-600x593.jpg', title: 'MÓN ĂN NHẸ', cols: 2, path: '/thuc-don/mon-an-nhe' },
  { img: '/Upload/ga-hap-mam-600x600.jpg', title: 'MÓN GÀ', cols: 2, path: '/thuc-don/mon-ga' },
  { img: '/Upload/Ca-lang-nuong-sate-tomyum.jpg', title: 'MÓN CÁ', cols: 2, path: '/thuc-don/mon-ca' },
];

function HomePage() {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy 4 sản phẩm đầu tiên từ API
  useEffect(() => {
    fetch(`${API_URLS.PRODUCTS}`) // Gọi API
      .then(res => res.json())
      .then(data => {
        setNewProducts(data.slice(0, 4)); // Lấy 4 sản phẩm đầu tiên
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi fetch sản phẩm:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Slideshow />
      <Container sx={{ my: 5 }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe src="https://www.youtube.com/embed/RVscyu-2ivc" title="Khai trương" frameBorder="0" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </Box>
      </Container>

      {/* Phần Món Mới (giữ nguyên) */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#601d1b', textTransform: 'uppercase' }}>
          Món Mới
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }} justifyContent="center">
            {newProducts.map((product) => (
              <Grid item key={product.id_sanpham} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* --- 3. THÊM LẠI PHẦN DANH MỤC THỰC ĐƠN --- */}
      <Box sx={{ py: 5, bgcolor: '#fdf8e8' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#601d1b', textTransform: 'uppercase', mb: 4 }}>
            Danh Mục Thực Đơn
          </Typography>
          <ImageList variant="quilted" cols={4} rowHeight={220} gap={16}>
            {menuItems.map((item) => (
              <ImageListItem 
                key={item.img} 
                cols={item.cols || 1} 
                rows={item.rows || 1} 
                sx={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  '&:hover img': { // Thêm hiệu ứng zoom khi hover
                    transform: 'scale(1.1)',
                  }
                }}
                // Biến ImageListItem thành thẻ Link
                component={RouterLink} 
                to={item.path} // Đặt đường dẫn
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out' // Hiệu ứng zoom
                  }} 
                />
                <ImageListItemBar
                  title={item.title}
                  sx={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    '& .MuiImageListItemBar-title': { fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
    </Box>
  );
}
export default HomePage;