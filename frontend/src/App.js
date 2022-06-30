import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import Home from './pages/Home'
import Shop from './pages/Shop'
import { CartProvider } from './contexts/Cart'
import Dashboard from './components/admin/Dashboard/Dashboard';
import { UserProvider } from './contexts/User';



function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
      
      <Routes>
        {/* Mặc định ứng dụng mở lên sẽ vô trang Home */}
        <Route path='/' element={<Home />} />

        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        {/* Những trang khác tương tự nhé */}

        

          </Routes>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
