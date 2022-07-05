import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import Home from './pages/Home'
import Shop from './pages/Shop'
import { CartProvider } from './contexts/Cart'
import { UserProvider } from './contexts/User';
import Dashboard from './components/admin/Dashboard/Dashboard';
import Main from './components/admin/Dashboard/Main/Main';
import DashBoardOrders from './components/admin/Dashboard/Orders/DashBoardOrders';
import Products from './components/admin/Dashboard/Products/Products';

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
        <Route  path="/admin/*" element={<Dashboard />} >
              <Route path="Products"  element={<Products />}/>
              <Route path="Dashboard"  element={<Main />}/>
              <Route path="Orders"  element={<DashBoardOrders />}/>
        </Route>

          </Routes>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
