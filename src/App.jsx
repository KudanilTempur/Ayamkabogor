import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// 1. IMPORT KOMPONEN LAYOUT (Sudah Benar)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. IMPORT HALAMAN DARI FOLDER 'pages'
// (Bukan dari 'components')
import HalamanUtamaSaja from './pages/HalamanUtamaSaja';
import MenuPage from './pages/menuPage';
// import MenuLengkapPage from './pages/MenuLengkapPage'; 

function App() {
  return (
    <Router>
      {/* Layout ini tampil di semua halaman */}
      <Navbar />

      {/* Konten halaman akan berganti di sini */}
      <Routes>
        {/* Path "/" memuat HalamanUtamaSaja dari folder 'pages' */}
        <Route path="/" element={<HalamanUtamaSaja />} />

        {/* Path "/menu-lengkap" memuat MenuLengkapPage */}
        <Route path="/menu-lengkap" element={<MenuPage />} />
      </Routes>

      {/* Layout ini tampil di semua halaman */}
      <Footer />
    </Router>
  );
}

export default App;