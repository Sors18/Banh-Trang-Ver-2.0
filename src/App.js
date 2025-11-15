// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Layouts
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute'; 

// Import các Trang
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProductListPage from './components/ProductListPage'; 
import ProductDetailPage from './components/ProductDetailPage';
import SearchPage from './components/SearchPage';
import NewsPage from './components/NewsPage';
import NewsDetailPage from './components/NewsDetailPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import OrderDetailPage from './components/OrderDetailPage';

// --- 1. IMPORT TRANG TUYỂN DỤNG MỚI ---
import RecruitmentPage from './components/RecruitmentPage'; 

// Import các Trang Admin
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminOrderListPage from './components/AdminOrderListPage';
import AdminOrderDetailPage from './components/AdminOrderDetailPage';
import AdminRevenuePage from './components/AdminRevenuePage';
import AdminProductListPage from './components/AdminProductListPage';
import AdminProductEditPage from './components/AdminProductEditPage';
import AdminProductAddPage from './components/AdminProductAddPage';
import AdminUserListPage from './components/AdminUserListPage';
import AdminUserAddPage from './components/AdminUserAddPage';
import AdminUserEditPage from './components/AdminUserEditPage';
import AdminNewsListPage from './components/AdminNewsListPage';
import AdminNewsAddPage from './components/AdminNewsAddPage';
import AdminNewsEditPage from './components/AdminNewsEditPage';
import ContactPage from './components/ContactPage';
import AdminContactPage from './components/AdminContactPage';


const CategoryPage = ({ slug }) => <ProductListPage categorySlug={slug} />;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* === 1. ROUTE CÔNG KHAI (có Navbar/Footer) === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          
          <Route path="/thuc-don/banh-trang" element={<CategoryPage slug="banh-trang" />} />
          <Route path="/thuc-don/rau-salad" element={<CategoryPage slug="rau-salad" />} />
          <Route path="/thuc-don/mon-an-nhe" element={<CategoryPage slug="mon-an-nhe" />} />
          <Route path="/thuc-don/mon-ga" element={<CategoryPage slug="mon-ga" />} />
          <Route path="/thuc-don/mon-ca" element={<CategoryPage slug="mon-ca" />} />

          <Route path="/san-pham/:id" element={<ProductDetailPage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/tin-tuc/:id" element={<NewsDetailPage />} />
          
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/thanh-toan" element={<CheckoutPage />} />
          
          <Route path="/don-hang" element={<OrderHistoryPage />} />
          <Route path="/don-hang/:id" element={<OrderDetailPage />} />

          {/* --- 2. SỬA LẠI ROUTE NÀY --- */}
          <Route path="/tuyen-dung" element={<RecruitmentPage />} />

          <Route path="/lien-he" element={<ContactPage />} />
        </Route>

        {/* === 2. ROUTE ADMIN (CHỈ CÓ SIDEBAR) === */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}> 
            <Route index element={<AdminDashboardPage />} /> 
            <Route path="don-hang" element={<AdminOrderListPage />} />
            <Route path="don-hang/:id" element={<AdminOrderDetailPage />} />
            <Route path="bao-cao" element={<AdminRevenuePage />} /> 
            <Route path="san-pham" element={<AdminProductListPage />} />
            <Route path="san-pham/them" element={<AdminProductAddPage />} />
            <Route path="san-pham/sua/:id" element={<AdminProductEditPage />} />
            <Route path="nguoi-dung" element={<AdminUserListPage />} />
            <Route path="nguoi-dung/them" element={<AdminUserAddPage />} />
            <Route path="nguoi-dung/sua/:id" element={<AdminUserEditPage />} />
            <Route path="tin-tuc" element={<AdminNewsListPage />} />
            <Route path="tin-tuc/them" element={<AdminNewsAddPage />} />
            <Route path="tin-tuc/sua/:id" element={<AdminNewsEditPage />} />
            <Route path="lien-he" element={<AdminContactPage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;