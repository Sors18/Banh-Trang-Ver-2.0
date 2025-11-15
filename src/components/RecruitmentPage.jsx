// src/components/RecruitmentPage.jsx
import React from 'react';
import { Container, Box, Typography, Grid, List, ListItem, Divider } from '@mui/material';
// Import các icon
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Dữ liệu tĩnh cho các công việc (lấy từ file HTML của bạn)
const jobs = [
  {
    title: 'Tuyển dụng vị trí Lễ tân nhà hàng',
    salary: 'Cạnh tranh',
    location: 'Hà Nội'
  },
  {
    title: 'Tuyển dụng Chuyên viên Truyền thông',
    salary: '9.000.000 - 12.000.000 VND',
    location: 'Hà Nội'
  },
  {
    title: 'Tuyển dụng vị trí Lễ tân nhà hàng', // File HTML của bạn có 2 vị trí Lễ tân
    salary: '7,000,000 - Không giới hạn',
    location: 'Hà Nội'
  }
];

function RecruitmentPage() {
  return (
    <Box>
      {/* 1. Banner Image */}
      <Box
        component="img"
        src="Media/Screenshot 2024-11-08 214605.png" // Lấy từ file HTML
        alt="Tuyển dụng banner"
        sx={{ width: '100%', height: 'auto' }}
      />

      {/* 2. Khối chứa danh sách công việc */}
      <Container 
        maxWidth="lg" // Tương đương 1150px
        sx={{ 
          backgroundColor: '#fefde1', // Màu nền
          marginTop: '50px', 
          marginBottom: '80px', 
          borderRadius: '30px', // Bo góc
          paddingY: 5 // Đệm lót bên trong
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            color: '#601d1b', 
            fontWeight: 'bold',
            marginBottom: 5 // Khoảng cách
          }}
        >
          Cơ hội làm việc hấp dẫn cho bạn
        </Typography>
        
        {/* Danh sách công việc */}
        <List sx={{ width: '90%', margin: '0 auto' }}> {/* Căn giữa list */}
          {jobs.map((job, index) => (
            // Dùng React.Fragment để chèn Divider
            <React.Fragment key={index}>
              <ListItem sx={{ paddingX: 0 }}>
                <Grid container spacing={2} alignItems="center">
                  
                  {/* Cột trái: Tiêu đề công việc */}
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ color: 'grey', fontSize: '22px' }}>
                      {job.title}
                    </Typography>
                  </Grid>
                  
                  {/* Cột phải: Lương và Địa điểm */}
                  <Grid item xs={12} md={6}>
                    <Typography 
                      sx={{ 
                        color: '#601d1b', 
                        fontSize: '20px', 
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap' // Cho phép xuống hàng trên di động
                      }}
                    >
                      <AttachMoneyIcon sx={{ marginRight: '5px' }} /> {job.salary}
                      <LocationOnIcon sx={{ marginLeft: '15px', marginRight: '5px' }} /> {job.location}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              
              {/* Thêm dấu gạch ngang (Divider) giữa các mục */}
              {index < jobs.length - 1 && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default RecruitmentPage;