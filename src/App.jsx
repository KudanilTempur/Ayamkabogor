// src/App.jsx

import React from 'react';
import './App.css'; // Ini adalah file CSS global

// 1. IMPORT KOMPONEN NAVBAR YANG SUDAH KAMU BUAT
import Navbar from './components/Navbar';

// Nanti kamu juga akan import komponen Halaman (Pages) di sini
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';

function App() {

  return (
    // <div> ini adalah pembungkus utama seluruh website
    <div className="App">

      {/* 2. TAMPILKAN NAVBAR DI PALING ATAS */}
      <Navbar />

      {/* 3. KONTEN HALAMAN
        Di sinilah nanti konten halaman utamamu akan muncul.
        Untuk sekarang, kita bisa isi dengan teks sementara.
        (Nanti ini akan di-handle oleh React Router)
      */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Konten Halaman Utama</h1>
        <p className="mt-2">
          Navbar sudah berhasil tampil di atas.
          Sekarang kita bisa mulai membuat konten halaman di bawah ini.
        </p>
      </main>

      {/* Nanti kamu juga bisa tambahkan <Footer /> di paling bawah */}
      {/* <Footer /> */}

    </div>
  );
}

export default App;