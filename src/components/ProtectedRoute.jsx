import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Komponen ini bertugas mengecek:
// 1. Apakah ada token? (Sudah login belum)
// 2. Apakah rolenya sesuai? (Admin atau User)

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();

    // Ambil data dari LocalStorage (yang disimpan waktu Login tadi)
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    let user = null;

    try {
        user = JSON.parse(userString);
    } catch (e) {
        console.error("Error parsing user data", e);
    }

    // CEK 1: Apakah user sudah login?
    if (!token || !user) {
        // Kalau belum login, tendang balik ke halaman Login
        // state={{ from: location }} gunanya supaya nanti habis login bisa balik ke halaman yg dituju
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // CEK 2: Apakah Role user sesuai dengan yang diminta halaman ini?
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Contoh: User biasa (role: 'user') coba masuk ke Admin Dashboard (butuh: 'admin')
        // Maka tendang ke halaman utama
        return <Navigate to="/" replace />;
    }

    // Kalau semua aman, silakan masuk (render halaman aslinya)
    return children;
};

export default ProtectedRoute;