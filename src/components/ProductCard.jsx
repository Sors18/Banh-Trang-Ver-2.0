// src/components/ProductCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  // SỬA: Dùng tên cột từ CSDL
  const { id_sanpham, tensp, danhmuc, gia, hinhanh } = product;

  // Định dạng giá tiền
  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(gia);

  const handleViewDetails = () => {
    navigate(`/san-pham/${id_sanpham}`); // SỬA: Dùng id_sanpham
  };

  return (
    // SỬA 1: Thêm onClick và cursor: 'pointer' vào thẻ Card
    <Card
      onClick={handleViewDetails}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderRadius: '8px',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-5px)' },
        cursor: 'pointer', // Thêm để có hiệu ứng con trỏ chuột
      }}
    >
      {/* SỬA: Thêm /Upload/ vào trước hinhanh */}
      <CardMedia component="img" height="250" image={`/Upload/${hinhanh}`} alt={tensp} sx={{ objectFit: 'cover' }} />
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="caption" display="block" sx={{ color: '#a17a6d', mb: 0.5, textTransform: 'uppercase' }}>
          {danhmuc}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#bd784e', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {tensp}
        </Typography>
        <Typography variant="h6" sx={{ color: '#33524b', fontWeight: 'bolder', fontSize: '1.1rem' }}>
          {formattedPrice}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ProductCard;