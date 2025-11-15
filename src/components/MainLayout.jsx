// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function MainLayout() {
  return (
    <>
      <Navbar />
      
      {/* Đây là nơi nội dung trang chủ, trang giới thiệu... hiển thị */}
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
}

export default MainLayout;