import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroSection from '../components/HeroSection.jsx';
import TentangAp from '../components/about_page/tentang_ap.jsx';
import PesananDiterima2 from '../components/about_page/pesanan_diterima2.jsx';
import TentangLengkap from '../components/about_page/tentang_lengkap.jsx';
import PunyaPertanyaan from '../components/menu_page/pertanyaan.jsx';



function About() {
    return (
        <main>
            <HeroSection />
            <TentangAp />
            <PesananDiterima2 />
            <TentangLengkap />
            <PunyaPertanyaan />





        </main>
    );
}

export default About;
