// src/components/AdminLayout.jsx
import React from 'react';
// SỬA: Import đầy đủ
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Button } from '@mui/material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- SỬA: THÊM LẠI CÁC HẰNG SỐ STYLE ---
const sidebarStyle = {
  width: '250px',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: '#f4f4f4',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column'
};

const navLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  '&.active': {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold'
  }
};
// --- KẾT THÚC SỬA ---


function AdminLayout() {
  // --- SỬA: THÊM LẠI LOGIC BỊ THIẾU ---
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };
  // --- KẾT THÚC SỬA ---

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 1. Sidebar */}
      <Box sx={sidebarStyle}>
        
        {/* Phần link (ở trên) */}
        <Box>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>Admin Panel</Typography>
          <List component="nav">
            
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin" end sx={navLinkStyle}>
                <ListItemText primary="Thống Kê" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/don-hang" sx={navLinkStyle}>
                <ListItemText primary="Quản lý Đơn hàng" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/bao-cao" sx={navLinkStyle}>
                <ListItemText primary="Báo cáo Doanh thu" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/san-pham" sx={navLinkStyle}>
                <ListItemText primary="Quản lý Sản phẩm" />
              </ListItemButton>
            </ListItem>

            {/* --- SỬA: THÊM LINK "QUẢN LÝ NGƯỜI DÙNG" --- */}
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/nguoi-dung" sx={navLinkStyle}>
                <ListItemText primary="Quản lý Người dùng" />
              </ListItemButton>
            </ListItem>
            {/* --- Quản lý Tin tức --- */}
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/tin-tuc" sx={navLinkStyle}>
                <ListItemText primary="Quản lý Tin tức" />
              </ListItemButton>
            </ListItem>
            {/* --- Quản lý Liên hệ --- */}
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin/lien-he" sx={navLinkStyle}>
                <ListItemText primary="Hòm thư Liên hệ" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} /> 

        {/* Phần user và đăng xuất */}
        <Box sx={{ p: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
            Chào, {user ? user.username : 'Admin'}!
          </Typography>
          <Button 
            variant="contained" 
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Box>
      </Box>

      {/* 2. Nội dung chính */}
      <Box 
        component="main" 
        sx={{ 
          marginLeft: '250px', 
          width: 'calc(100% - 250px)', 
          padding: '20px' 
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  );
}

export default AdminLayout;