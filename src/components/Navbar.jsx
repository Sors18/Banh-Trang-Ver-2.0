// src/components/Navbar.jsx
import React, { useState } from 'react';

import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  Menu, 
  MenuItem, 
  InputBase, 
  IconButton, 
  Badge 
} from '@mui/material';

import { 
  Search as SearchIcon, 
  ShoppingCart, 
  ArrowDropDown as ArrowDropDownIcon, 
  AccountCircle 
} from '@mui/icons-material';

import { NavLink, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Định nghĩa kiểu chung cho các mục menu
const menuLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '8px 16px',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'inherit',
  fontSize: '0.875rem'
};

// Kiểu khi link được "active"
const activeMenuLinkStyle = {
  ...menuLinkStyle,
  borderBottom: '3px solid white',
};

function Navbar() {
  const [foodMenuAnchorEl, setFoodMenuAnchorEl] = useState(null); 
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null); 
  
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const foodMenuOpen = Boolean(foodMenuAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl); 

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cho "Thực đơn"
  const handleFoodMenuClick = (event) => setFoodMenuAnchorEl(event.currentTarget);
  const handleFoodMenuClose = () => setFoodMenuAnchorEl(null);

  // Cho "User"
  const handleUserMenuClick = (event) => setUserMenuAnchorEl(event.currentTarget); 
  const handleUserMenuClose = () => setUserMenuAnchorEl(null); 

  // Hàm điều hướng (đóng menu Thực đơn)
  const handleNavigate = (path) => {
    handleFoodMenuClose();
    navigate(path);
  };
  
  // Hàm điều hướng (đóng menu User)
  const handleUserMenuNavigate = (path) => { 
    handleUserMenuClose();
    navigate(path);
  };

  // Hàm đăng xuất
  const handleLogout = () => { 
    handleUserMenuClose();
    logout();
  };
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tim-kiem?q=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: '#601d1b' }}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: 'auto', md: '200px' } }}>
          <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box component="img" src="/Media/logo.png" alt="Logo" sx={{ height: 80, mr: 2 }} />
          </Box>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

        {/* Search */}
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ position: 'relative', backgroundColor: 'white', borderRadius: '20px', maxWidth: '400px', width: '100%' }}>
          <InputBase placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ pl: 2, pr: 5, width: '100%', color: '#333' }} />
          <IconButton type="submit" sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', color: '#601d1b' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

        {/* Các nút bên phải */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', minWidth: '200px', justifyContent: 'flex-end' }}>
          {user ? (
            <>
              {/* Nút "Chào, user" */}
              <Button 
                color="inherit" 
                onClick={handleUserMenuClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{ textTransform: 'none', fontSize: '1rem' }}
              >
                Chào, {user.username}!
              </Button>
              {/* Menu dropdown cho User */}
              <Menu
                anchorEl={userMenuAnchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                
                {/* --- SỬA LỖI LOGIC Ở ĐÂY --- */}
                {/* Thay vì `{user.isAdmin && ...}` (lỗi)
                  Chúng ta dùng `{user.isAdmin == 1 && ...}`
                  (Dùng == 1 để chấp nhận cả số 1 và string "1")
                */}
                {user.isAdmin == 1 && (
                  <MenuItem onClick={() => handleUserMenuNavigate('/admin/')}>
                    Trang Admin
                  </MenuItem>
                )}
                {/* --------------------- */}

                <MenuItem onClick={() => handleUserMenuNavigate('/don-hang')}>
                  Đơn hàng
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Giữ nguyên phần đăng nhập / đăng ký
            <>
              <Button color="inherit" startIcon={<AccountCircle />} onClick={() => navigate('/dang-nhap')}>Đăng nhập</Button>
              <Button color="inherit" onClick={() => navigate('/dang-ky')}>Đăng ký</Button>
            </>
          )}

          {/* Icon Giỏ hàng */}
          <IconButton 
            sx={{ color: 'white', ml: 1 }} 
            component={RouterLink}
            to="/gio-hang"
          >
            <Badge badgeContent={totalCartItems} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Thanh Nav thứ 2 (Menu) */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#722c29', 
        py: 1,
        flexWrap: 'wrap' 
      }}>
        <NavLink to="/gioi-thieu" style={({ isActive }) => isActive ? activeMenuLinkStyle : menuLinkStyle}>Giới thiệu</NavLink>
        
        <Button 
          onClick={handleFoodMenuClick} 
          sx={menuLinkStyle} 
          endIcon={<ArrowDropDownIcon />}
        >
          Thực đơn
        </Button>
        <Menu 
          anchorEl={foodMenuAnchorEl} 
          open={foodMenuOpen} 
          onClose={handleFoodMenuClose} 
        >
          <MenuItem onClick={() => handleNavigate('/thuc-don/banh-trang')}>BÁNH TRÁNG</MenuItem>
          <MenuItem onClick={() => handleNavigate('/thuc-don/rau-salad')}>RAU - SALAD</MenuItem>
          <MenuItem onClick={() => handleNavigate('/thuc-don/mon-an-nhe')}>MÓN ĂN NHẸ</MenuItem>
          <MenuItem onClick={() => handleNavigate('/thuc-don/mon-ga')}>MÓN GÀ</MenuItem>
          <MenuItem onClick={() => handleNavigate('/thuc-don/mon-ca')}>MÓN CÁ</MenuItem>
        </Menu>

        <NavLink to="/tin-tuc" style={({ isActive }) => isActive ? activeMenuLinkStyle : menuLinkStyle}>Tin tức</NavLink>
        <NavLink to="/tuyen-dung" style={({ isActive }) => isActive ? activeMenuLinkStyle : menuLinkStyle}>Tuyển dụng</NavLink>
        <NavLink to="/lien-he" style={({ isActive }) => isActive ? activeMenuLinkStyle : menuLinkStyle}>Liên hệ</NavLink>
        <Typography sx={{ color: 'white', fontWeight: 'bold', ml: 4 }}>📞 1900 63 65 69</Typography>
      </Box>
    </AppBar>
  );
}
export default Navbar;