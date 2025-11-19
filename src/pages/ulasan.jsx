import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroSection from '../components/HeroSection.jsx';
import KataMereka from '../components/ulasan_page/kata_mereka.jsx';
import UlasanPelanggan from '../components/ulasan_page/ulasan_pelanggan.jsx';
// Ganti jadi huruf besar (TulisUlasan.jsx)
import TulisUlasan from "../components/ulasan_page/tulis_ulasan.jsx";
// (Kita juga butuh .jsx di akhir, berdasarkan error Anda sebelumnya)


function Ulasan() {
    return (
        <main>
            <HeroSection />
            <KataMereka />
            <UlasanPelanggan />
            <TulisUlasan />



        </main>
    );
}

export default Ulasan;
