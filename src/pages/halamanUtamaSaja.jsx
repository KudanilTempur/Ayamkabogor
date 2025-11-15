import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroSection from '../components/HeroSection.jsx';
import TentangRingkas from '../components/TentangRingkas.jsx';
import PesananDiterima from '../components/pesanan_diterima.jsx';
import MenuPilihan from '../components/menuPilihan.jsx';
import Keunggulan from '../components/keunggulan.jsx';
import MenuHariIni from '../components/menuHariIni.jsx';
import KataMereka from '../components/komentar.jsx';

// (Kita juga butuh .jsx di akhir, berdasarkan error Anda sebelumnya)

function HalamanUtamaSaja() {
    return (
        <main>
            <HeroSection />
            <TentangRingkas />
            <PesananDiterima />
            <MenuPilihan />
            <Keunggulan />
            <MenuHariIni />
            <KataMereka />
        </main>
    );
}

export default HalamanUtamaSaja;
