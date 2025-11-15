// src/components/ProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { API_URLS } from '../apiConfig'; // Import API URL

// Map tên trên URL sang tên hiển thị
const categoryMap = {
  'banh-trang': { name: 'BÁNH TRÁNG' },
  'rau-salad': { name: 'RAU - SALAD' },
  'mon-an-nhe': { name: 'MÓN ĂN NHẸ' },
  'mon-ga': { name: 'MÓN GÀ' },
  'mon-ca': { name: 'MÓN CÁ' },
};

function ProductListPage({ categorySlug }) { // Nhận slug từ App.js
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categoryName = categoryMap[categorySlug]?.name || 'Sản phẩm';

  useEffect(() => {
    setLoading(true);
    // Gọi API PHP với slug danh mục
    fetch(`${API_URLS.PRODUCTS}?category=${categorySlug}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi fetch sản phẩm:", err);
        setLoading(false);
      });
  }, [categorySlug]); // Chạy lại mỗi khi slug thay đổi

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '80vh' }}>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}><Sidebar /></Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" sx={{ color: '#bd784e', fontWeight: 500, textAlign: 'center', mb: 4 }}>
              {categoryName}
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>
            ) : (
              <Grid container spacing={3}>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Grid item key={product.id_sanpham} xs={12} sm={6} md={4}>
                      <ProductCard product={product} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.2rem', color: '#722c29' }}>
                      Không có sản phẩm nào trong danh mục này.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default ProductListPage;