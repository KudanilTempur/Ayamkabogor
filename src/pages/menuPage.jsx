import React from 'react';
// Path '../' untuk keluar dari folder 'pages'
import '../App.css';

// 1. IMPORT SEMUA KOMPONEN
// Perbaiki semua path ini agar memiliki '../components/'
import HeroMenu from '../components/menu_page/hero_menu.jsx';
import MenuHariIni from '../components/menuHariIni.jsx';
import MenuList from '../components/menu_page/menu_list.jsx';
import MenuPilihan from '../components/menuPilihan.jsx';
import PunyaPertanyaan from '../components/menu_page/pertanyaan.jsx';
// (Kita juga butuh .jsx di akhir, berdasarkan error Anda sebelumnya)


function MenuPage() {
    return (
        <main>
            <HeroMenu />
            <MenuPilihan />
            <MenuHariIni />
            <MenuList />
            <PunyaPertanyaan />



        </main>
    );
}

export default MenuPage;
