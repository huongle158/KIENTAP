import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import Home from './pages/Home'
import Shop from './pages/Shop'



function App() {
  return (
    <>
      <Routes>
        {/* Mặc định ứng dụng mở lên sẽ vô trang Home */}
        <Route path='/' element={<Home />} />

        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        {/* Những trang khác tương tự nhé */}

        

      </Routes>
    </>
  );
}

export default App;
