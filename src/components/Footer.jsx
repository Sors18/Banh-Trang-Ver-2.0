// src/components/Footer.jsx

import React from 'react';
// Import các component MUI và Icons cần thiết cho Footer
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import { Facebook, Email, Phone, YouTube } from '@mui/icons-material';

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#601d1b', color: '#fefddb', mt: '50px', py: 4 }}>
        <Container>
            {/* Tầng trên: Hỗ trợ, Nhà hàng, Mạng xã hội */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Cột 1: Hỗ trợ khách hàng */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        HỖ TRỢ KHÁCH HÀNG
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>1900.63.65.69</Typography>
                    <Typography sx={{ fontSize: '1rem', mb: 2 }}>T2 - CN: 10:30 - 22:00</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Chính sách thanh toán hoàn tiền
                        </Link>
                        <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Chính sách xử lý khiếu nại
                        </Link>
                        <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Chính sách vận chuyển
                        </Link>
                        <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Chính sách bảo mật
                        </Link>
                    </Box>
                </Grid>

                {/* Cột 2: Nhà hàng */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Nhà hàng Bánh tráng Phú Cường
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Giới thiệu
                                </Link>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Menu
                                </Link>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Đặt bàn
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Thông tin khuyến mãi
                                </Link>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Tuyển dụng
                                </Link>
                                <Link href="#" sx={{ color: '#fefddb', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                    Liên hệ
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                
                {/* Cột 3: Mạng xã hội */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        MẠNG XÃ HỘI
                    </Typography>
                    <Box 
                        component="img" 
                        src="/Upload/nhung.png" // Đường dẫn ảnh banner của bạn
                        alt="Mạng xã hội" 
                        sx={{ width: '100%', borderRadius: '8px', mb: 2, maxWidth: '350px' }}
                    />
                    <Box>
                        <Link href="#" sx={{ color: '#fefddb', mr: 1.5 }}><Facebook sx={{ fontSize: 30 }} /></Link>
                        <Link href="#" sx={{ color: '#fefddb', mr: 1.5 }}><Email sx={{ fontSize: 30 }} /></Link>
                        <Link href="#" sx={{ color: '#fefddb', mr: 1.5 }}><Phone sx={{ fontSize: 30 }} /></Link>
                        <Link href="#" sx={{ color: '#fefddb' }}><YouTube sx={{ fontSize: 30 }} /></Link>
                    </Box>
                </Grid>
            </Grid>

            {/* Tầng dưới: Danh sách cơ sở */}
            <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 1:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 42 Nguyên Hồng - Láng Hạ - Đống Đa - HN <br />* 024 3773 9846 - 09 3223 2299</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 2:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 104 Yết Kiêu - Nguyễn Du - Hai Bà Trưng - HN <br />* 024 6277 8877 - 092 667 6996</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 3:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 102 Trần Phú - Hà Đông - HN <br />* 024 2244 6060 - 09 3344 6060</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 4:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 100 Vũ Phạm Hàm - Cầu Giấy - HN <br />* 024 2266 6060 - 08 2266 6060</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 5:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 340 Bà Triệu - Hai Bà Trưng - HN <br />* 024 3333 5533 - 0373 340 340</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '25px', fontWeight: 'bold', mt: '50px' }}>CƠ SỞ 6:</Typography>
                    <Typography sx={{ color: '#fefddb', fontSize: '17px', mt: '10px' }}>* 76 Nguyễn Chí Thanh - Đống Đa - HN <br />* 024 6288 6060 - 0901 01 7676</Typography>
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
}

export default Footer;