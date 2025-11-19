import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroSection from '../components/HeroSection.jsx';
import PertanyaanUmum from '../components/FAQ_page/pertanyaan_umum.jsx';
import PunyaPertanyaan from '../components/menu_page/pertanyaan.jsx';



function Ulasan() {
    return (
        <main>
            <HeroSection />
            <PertanyaanUmum />
            <PunyaPertanyaan />





        </main>
    );
}

export default Ulasan;
