// src/components/AboutPage.jsx

import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

// Import các component chung
import Slideshow from './Slideshow'; // Tái sử dụng slideshow
import Footer from './Footer';       // Tái sử dụng footer

// Định nghĩa một số kiểu (style) chung cho trang này
const bodyTextStyle = {
    textAlign: 'justify', 
    color: '#681c1c', 
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    fontWeight: 400,
    mb: 2 // Margin bottom 2
};

const titleStyle = {
    color: '#601d1b', 
    fontWeight: 'bold', 
    mb: 2,
    textAlign: 'justify'
};

function AboutPage() {
  return (
    <Box>
      {/* KHÔNG cần <Navbar /> ở đây, 
        vì file App.js của bạn đã hiển thị nó rồi.
      */}
      
      {/* 1. Slideshow (Tái sử dụng) */}
      <Slideshow />

      {/* 2. Nội dung trang */}
      <Container maxWidth="md" sx={{ my: 5, backgroundColor: 'white', p: { xs: 2, md: 4 } }}>
        
        {/* CÂU CHUYỆN THƯƠNG HIỆU */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={5}>
            <Box 
              component="img" 
              src="Media/Group-5-1.png" 
              alt="Câu chuyện thương hiệu"
              sx={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" component="h2" sx={titleStyle}>
              Câu chuyện thương hiệu
            </Typography>
            <Typography sx={bodyTextStyle}>
              Sau một hành trình nghiên cứu ẩm thực đầy tâm huyết, Bánh tráng Phú Cường trở thành không gian lý tưởng của sự chuyển đổi tình yêu và đam mê thành những bữa ăn tinh tế. Sứ mệnh của nhà hàng vượt xa việc mang đặc sản từ khắp nơi về gần thực khách; đó là một hành trình đầy sáng tạo nhằm khám phá những hương vị mới mẻ với mục tiêu mang đến "Bữa ăn ngon cho người Việt".
            </Typography>
            <Typography sx={bodyTextStyle}>
              Bánh tráng thịt heo, món đặc trưng của nhà hàng, bình dị nhưng khiến bạn mê đắm bởi sự hòa quyện tuyệt vời giữa thịt heo tươi ngon, rau xanh tươi mới, bánh tráng mỏng dai cùng hương vị độc đáo của mắm nêm. Ngoài ra, menu đa dạng của nhà hàng còn thể hiện bức tranh phong phú về văn hóa ẩm thực... (v.v... toàn bộ phần text dài của bạn)
            </Typography>
          </Grid>
        </Grid>

        {/* TRIẾT LÝ THƯƠNG HIỆU */}
        {/* Đảo ngược thứ tự cột (text trước, ảnh sau) bằng 'direction' */}
        <Grid container spacing={4} sx={{ mt: 5 }} direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" component="h2" sx={titleStyle}>
              Triết lý thương hiệu
            </Typography>
            <Typography sx={bodyTextStyle}>
              Nhà hàng Bánh tráng Phú Cường không những là nơi để thưởng thức đồ ăn ngon mà còn là điểm gặp gỡ của những tâm hồn đam mê ẩm thực. Trong không gian ấm cúng, mọi người có thể cùng nhau tận hưởng niềm đam mê chung và chia sẻ những kí ức đẹp. Đối với Phú Cường, ẩm thực vừa là một trải nghiệm ăn uống vừa là hành trình kết nối con người qua những hương vị tuyệt vời.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box 
              component="img" 
              src="Media/Group-4-1.png" 
              alt="Triết lý thương hiệu"
              sx={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
        </Grid>

      </Container>
      
      {/* 3. Footer (Tái sử dụng) */}
      <Footer />
    </Box>
  );
}

export default AboutPage;