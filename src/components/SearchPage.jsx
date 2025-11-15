// src/components/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { API_URLS } from '../apiConfig'; // Import API URL

// Hàm chuẩn hóa text (để tìm kiếm không dấu)
function normalizeText(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Gọi API PHP để tìm kiếm
      // Chúng ta sẽ chuẩn hóa ở Front-end sau khi nhận kết quả
      fetch(`${API_URLS.PRODUCTS}`)
        .then(res => res.json())
        .then(data => {
          const normalizedQuery = normalizeText(query);
          const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0);
          
          const results = data.filter(product => {
            const normalizedName = normalizeText(product.tensp);
            return queryWords.every(word => normalizedName.includes(word));
          });
          
          setFilteredProducts(results);
          setLoading(false);
        })
        .catch(err => {
          console.error("Lỗi tìm kiếm:", err);
          setLoading(false);
        });
    } else {
      setFilteredProducts([]);
      setLoading(false);
    }
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '80vh' }}>
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#601d1b', mb: 4, textAlign: 'center' }}>
          Kết quả tìm kiếm cho: "{query}"
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id_sanpham} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ textAlign: 'center', fontSize: '1.2rem', color: '#722c29' }}>
                  Không tìm thấy sản phẩm nào phù hợp.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
export default SearchPage;