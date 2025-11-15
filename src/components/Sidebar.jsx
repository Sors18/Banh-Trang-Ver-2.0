// src/components/Sidebar.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const categories = [
  { name: 'BÁNH TRÁNG', path: '/thuc-don/banh-trang' },
  { name: 'RAU - SALAD', path: '/thuc-don/rau-salad' },
  { name: 'MÓN ĂN NHẸ', path: '/thuc-don/mon-an-nhe' },
  { name: 'MÓN GÀ', path: '/thuc-don/mon-ga' }, // SỬA: path này phải khớp App.js
  { name: 'MÓN CÁ', path: '/thuc-don/mon-ca' },
];

function Sidebar() {
  return (
    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '8px', background: '#fff' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#601d1b' }}>DANH MỤC</Typography>
      <List component="nav">
        {categories.map((cat) => (
          <ListItem key={cat.name} disablePadding>
            <ListItemButton component={NavLink} to={cat.path} sx={{ '&.active': { backgroundColor: '#fdf8e8', borderRight: '4px solid #bd784e', fontWeight: 'bold', color: '#bd784e' }, '&:hover': { backgroundColor: '#fefcf5' }, color: '#333' }}>
              <ListItemText primary={cat.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default Sidebar;