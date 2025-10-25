// src/components/Navbar.jsx

import React, { useState } from 'react';

// 1. IMPORT ICONS
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';

// 2. IMPORT LOGO KAMU
// GANTI 'nama-file-logo-kamu.png' DENGAN NAMA FILE ASLINYA DARI 'src/assets'
// Contoh: import logo from '../assets/image_2025-10-25_003515582-rem....png';
import logo from '../assets/logo-ayamkabogor.png'; // <-- PERHATIKAN & GANTI INI

function Navbar() {
    // State untuk mengontrol buka/tutup menu
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk toggle (buka/tutup) menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="sticky top-0 z-50">

            {/* ===== 1. NAVBAR BAR ===== */}

            {/* STEP 1: 
              Buat <nav> jadi 'relative' dan full-width. 
              HAPUS 'flex items-center justify-end'.
              'relative' penting sebagai "jangkar" untuk bar oranye.
            */}
            <nav className="containter mx-auto max-w-6xl relative p-2 h-14 flex items-center justify-end">

                {/* STEP 2: 
                  Ini BAR ORANYE Anda. 
                  - HAPUS 'mx-64'.
                  - TAMBAHKAN 'absolute left-1/2 -translate-x-1/2'.
                  Ini akan membuatnya SELALU di tengah layar.
                */}
                <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl px-2 justify-center rounded top-1/2 -translate-y-1/2 bg-gradient-to-b from-orange-600 to-orange-400 text-white font-bold shadow-lg absolute left-1/2 -translate-x-1/2">

                    {/* Konten di dalam bar oranye (Biarkan seperti ini) */}
                    <div className=" flex items-center justify-between">

                        {/* Tombol Menu (Kiri) */}
                        <button
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-black/10 transition-all"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <IoClose size={22} /> : <GiHamburgerMenu size={22} />}
                            <span className="text-xs tracking-wider uppercase">Menu</span>
                        </button>

                        {/* Logo (Tengah) */}
                        <div>
                            <a href="/">
                                <img src={logo} alt="Logo Ayam Kabogor" className="h-10" />
                            </a>
                        </div>

                        {/* Grup Kanan (WA) */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <a
                                href="https://wa.me/628123456789" // <-- GANTI NOMOR WA
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-full hover:bg-black/10 transition-all"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={26} />
                            </a>
                        </div>
                    </div>
                </div>
                {/* ==================== AKHIR DARI BAR ORANYE ==================== */}


                {/* STEP 3: 
                  Ini adalah pembungkus untuk tombol 'Pesan Sekarang'.
                  Karena bar oranye sudah 'absolute' (mengambang),
                  'div' ini adalah satu-satunya elemen di dalam <nav>.
                  
                  - 'container mx-auto': Menyejajarkan isinya dengan konten halaman.
                  - 'flex justify-end': Mendorong tombol ke kanan.
                  - 'h-14': (PENTING) Memberi tinggi pada <nav> agar
                    bar oranye yang mengambang tidak "bocor".
                    (Sesuaikan h-14 ke h-12 atau h-16 jika tinggi logo/bar Anda beda)
                */}
                <div className='container mx-auto flex justify-end items-center h-14'>
                    {/* Tombol Pesan Sekarang (Hanya Desktop) */}
                    <a
                        href="https://wa.me/628123456789" // <-- GANTI NOMOR WA
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:inline-block bg-gradient-to-b from-orange-600 to-orange-800 hover:from-orange-700 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-md shadow-md transition-all"
                    >
                        Pesan Sekarang!
                    </a>
                </div>
                {/* ==================== AKHIR DARI PERBAIKAN ==================== */}

            </nav>

            {/* ===== 2. DROPDOWN MENU (Desain image_32a11f.png) ===== */}
            {/* Ini tidak berubah, biarkan full-width agar bagus */}
            <div
                className={`
          absolute w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl max-w-6xl left-1/2 -translate-x-1/2 bg-gradient-to-b from-orange-400 to-orange-500 shadow-lg 
          text-white font-bold p-6 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
            >
                <ul className="flex flex-col items-center text-center space-y-4 tracking-wider">
                    <li>
                        <a href="/" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">
                            01 HOME
                        </a>
                    </li>
                    <li>
                        <a href="/about" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">
                            02 ABOUT US
                        </a>
                    </li>
                    <li>
                        <a href="/menu" onClick={toggleMenu} className="block py-3 px-6 w-60 hover:bg-black/10 rounded-md">
                            03 PRICELIST & MENU
                        </a>
                    </li>
                </ul>

                <a
                    href="https://wa.me/628123456789" // <-- GANTI NOMOR WA
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full max-w-xs mx-auto text-center mt-8 py-3 bg-orange-700 hover:bg-orange-800 rounded-lg tracking-wider transition-all"
                >
                    ORDER NOW!
                </a>
            </div>
        </header>
    );
}

export default Navbar;