// src/components/Navbar.jsx

import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';

// Pastikan path logo ini benar
import logo from '../assets/logo-ayamkabogor.png';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (

        <header className="fixed top-0 left-0 right-0 z-50">

            {/* --- FITUR CLICK OUTSIDE (OVERLAY) --- */}
            {/* Lapisan transparan ini menangkap klik di luar menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 w-full h-full bg-black/10 backdrop-blur-[1px] z-0"
                    onClick={toggleMenu}
                />
            )}

            <nav className="container mx-auto relative p-2 h-14 flex items-center justify-end">

                {/* BAR ORANYE TENGAH */}
                <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl px-2 justify-center rounded top-1/2 -translate-y-1/2 bg-gradient-to-b from-orange-600 to-orange-400 text-white font-bold shadow-lg absolute left-1/2 -translate-x-1/2">
                    <div className=" flex items-center justify-between">
                        {/* Tombol Menu */}
                        <button
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-black/10 transition-all"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <IoClose size={22} /> : <GiHamburgerMenu size={22} />}
                            <span className="text-xs tracking-wider uppercase">Menu</span>
                        </button>

                        {/* Logo */}
                        <div>
                            <a href="/">
                                <img src={logo} alt="Logo Ayam Kabogor" className="h-10" />
                            </a>
                        </div>

                        {/* Ikon WA */}
                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:bg-black/10 transition-all"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp size={26} />
                        </a>
                    </div>
                </div>

                {/* Tombol Pesan Sekarang (Desktop) */}
                <div className='container mx-auto flex justify-end items-center h-14'>
                    <a
                        href="https://wa.me/628123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:inline-block bg-gradient-to-b from-orange-600 to-orange-800 hover:from-orange-700 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        Pesan Sekarang!
                    </a>
                </div>
            </nav>

            {/* DROPDOWN MENU */}
            <div
                className={`
          absolute w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl max-w-6xl left-1/2 -translate-x-1/2 bg-gradient-to-b from-orange-400 to-orange-500 shadow-lg 
          text-white font-bold p-6 transition-all duration-300 ease-in-out rounded
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
                        {/* Saya tambahkan border-b disini agar konsisten dengan menu di atasnya */}
                        <a href="/menu-lengkap" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">
                            03 PRICELIST & MENU
                        </a>
                    </li>

                    {/* MENU BARU: ULASAN */}
                    <li>
                        <a href="/ulasan" onClick={toggleMenu} className="block py-3 px-6 w-60 hover:bg-black/10 rounded-md">
                            04 ULASAN
                        </a>
                    </li>

                    <li>
                        <a href="/FAQ" onClick={toggleMenu} className="block py-3 px-6 w-60 hover:bg-black/10 rounded-md">
                            05 FAQ
                        </a>
                    </li>

                    <li>
                        <a href="/keranjang" onClick={toggleMenu} className="block py-3 px-6 w-60 hover:bg-black/10 rounded-md">
                            06 keranjang
                        </a>
                    </li>
                </ul>

                <a
                    href="https://wa.me/628123456789"
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