import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

// Import Context Provider
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Page Components (Mengisi semua yang dibutuhkan dari list Anda)
import HalamanUtamaSaja from './pages/HalamanUtamaSaja';
import MenuPage from './pages/MenuPage';
import Ulasan from './pages/Ulasan';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Keranjang_belanja from './pages/Keranjang';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import UserProfile from './pages/UserProfile';
import RiwayatPesanan from './pages/RiwayatPesanan';
import AdminDashboard from './pages/AdminDashboard';


// Komponen Utama Layout yang menangani logika URL (useLocation)
const MainLayout = () => {
  // 2. Gunakan hook useLocation di dalam komponen yang di-render di dalam <Router>
  const location = useLocation();

  // 3. Tentukan nilai prop 'view' berdasarkan path saat ini
  const currentPath = location.pathname;

  let viewValue = 'client-page'; // Default untuk halaman klien lainnya

  // Logika Conditional Rendering: 
  // Cocokkan nilai view dengan yang dicek di komponen Footer.js
  if (currentPath === '/admin-dashboard') {
    viewValue = 'admin-dashboard';
  }
  // Jika Anda ingin menyembunyikan di halaman login/register juga
  else if (currentPath === '/login' || currentPath === '/register') {
    viewValue = 'admin-login';
  }


  return (
    <>
      {/* Navbar juga bisa disembunyikan di halaman admin jika diinginkan */}
      <Navbar />

      <Routes>
        {/* Rute Halaman Klien */}
        <Route path="/" element={<HalamanUtamaSaja />} />
        <Route path="/menu-lengkap" element={<MenuPage />} />
        <Route path="/ulasan" element={<Ulasan />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/keranjang" element={<Keranjang_belanja />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/riwayat-pesanan" element={<RiwayatPesanan />} />

        {/* Rute Autentikasi */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rute Admin (Footer akan disembunyikan di sini) */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* 5. Kirimkan viewValue ke Footer */}
      {/* Footer akan menggunakan nilai ini untuk memutuskan apakah akan me-render atau mengembalikan null */}
      <Footer view={viewValue} />
    </>
  );
}

// Komponen App hanya membungkus dengan Context dan Router
function App() {
  return (
    <Router>
      <MenuProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </MenuProvider>
    </Router>
  );
}

export default App;