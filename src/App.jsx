import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

// --- IMPORT CONTEXT ---
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';

// --- IMPORT COMPONENTS ---
// Sesuaikan dengan screenshot folder components kamu
import Navbar from './components/Navbar'; // Pastikan ada Navbar.jsx di components
import Footer from './components/footer'; // Sesuai screenshot (huruf kecil)
import ProtectedRoute from './components/ProtectedRoute'; // File baru tadi

// --- IMPORT PAGES ---
// Sesuai screenshot folder pages kamu (kebanyakan huruf kecil)
import HalamanUtamaSaja from './pages/halamanUtamaSaja';
import MenuPage from './pages/menuPage';
import Ulasan from './pages/ulasan';
import About from './pages/about';
import FAQ from './pages/FAQ';
import Keranjang_belanja from './pages/keranjang';
import LoginPage from './pages/login';       // Sesuai screenshot (login.jsx)
import RegisterPage from './pages/register'; // Sesuai screenshot (register.jsx)
import UserProfile from './pages/userProfile';
import RiwayatPesanan from './pages/riwayatPesanan';

// --- IMPORT ADMIN ---
import AdminDashboard from './components/admin/AdminDashboard';


// --- COMPONENT MAIN LAYOUT ---
const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Logic: Sembunyikan Navbar jika di halaman Admin, Login, atau Register
  const isFullScreenPage =
    currentPath.startsWith('/admin-dashboard') ||
    currentPath === '/login' ||
    currentPath === '/register';

  // Logic: Mengirim props ke Footer
  let viewValue = 'client-page';
  if (currentPath.startsWith('/admin-dashboard')) viewValue = 'admin-dashboard';
  else if (currentPath === '/login' || currentPath === '/register') viewValue = 'admin-login';

  return (
    <>
      {/* Navbar hanya muncul jika BUKAN halaman full screen */}
      {!isFullScreenPage && <Navbar />}

      <Routes>
        {/* === 1. PUBLIC ROUTES === */}
        <Route path="/" element={<HalamanUtamaSaja />} />
        <Route path="/menu-lengkap" element={<MenuPage />} />
        <Route path="/ulasan" element={<Ulasan />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQ" element={<FAQ />} />

        {/* Halaman Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        {/* === 2. CUSTOMER ROUTES (Harus Login) === */}
        <Route
          path="/keranjang"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Keranjang_belanja />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/riwayat-pesanan"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <RiwayatPesanan />
            </ProtectedRoute>
          }
        />


        {/* === 3. ADMIN ROUTES (Super Proteksi) === */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Footer */}
      <Footer view={viewValue} />
    </>
  );
}

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