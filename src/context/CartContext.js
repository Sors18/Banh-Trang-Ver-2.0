// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Lấy giỏ hàng từ localStorage (nếu có)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  // Lưu giỏ hàng vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id_sanpham === productToAdd.id_sanpham);
      if (existingItem) {
        // Nếu đã có, tăng số lượng
        return prevItems.map(item =>
          item.id_sanpham === productToAdd.id_sanpham
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Nếu chưa có, thêm mới với số lượng là 1
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId); // Nếu số lượng < 1, xóa
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id_sanpham === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Xóa sản phẩm
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id_sanpham !== productId)
    );
  };

  // Xóa sạch giỏ hàng (sau khi thanh toán)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider> // <-- SỬA LỖI Ở ĐÂY
  );
};

// Hook tùy chỉnh
export const useCart = () => {
  return useContext(CartContext);
};