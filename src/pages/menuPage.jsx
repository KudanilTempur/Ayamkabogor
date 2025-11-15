import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroMenu from '../components/hero_menu.jsx';
// (Kita juga butuh .jsx di akhir, berdasarkan error Anda sebelumnya)


function MenuPage() {
    return (
        <main>
            <HeroMenu />
        </main>
    );
}

export default MenuPage;
