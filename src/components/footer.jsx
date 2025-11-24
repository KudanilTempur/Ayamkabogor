import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import logo from '../assets/logo-ayamkabogor.png';

const Footer = ({ view }) => {
    const currentYear = new Date().getFullYear();
    // 1. Definisikan kondisi kapan footer harus disembunyikan
    const isAdminPage = view === 'admin-login' || view === 'admin-dashboard';
    if (isAdminPage) return null;

    return (
        <footer className="relative w-full bg-orange-700 ">


            {/* KONTEN UTAMA */}
            <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-orange-800 text-orange-50 pt-10 pb-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

                    {/* KOLOM 1 */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <div className="mb-2">
                            <img src={logo} alt="Logo Ayam Kabogor" className="h-20 w-auto object-contain filter drop-shadow-md" />
                        </div>
                        <p className="text-sm md:text-base leading-relaxed opacity-90">
                            Nikmati cita rasa ayam bakar dan goreng khas Bogor yang otentik. Bumbu meresap, sambal mantap!
                        </p>
                        <div className="flex items-start justify-center md:justify-start space-x-3 mt-4 opacity-90">
                            <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" />
                            <span className="text-sm">jalan Atang Sanjaya KM. 2, Bantarsari, Rancabungur Bogor,  Bogor, Indonesia 16310</span>
                        </div>
                    </div>

                    {/* KOLOM 2 (YANG DIPERBAIKI) */}
                    {/* KOLOM 2 */}
                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-xl font-bold text-white mb-6 tracking-wide border-b-2 border-yellow-400 pb-1 inline-block">
                            Akses Cepat
                        </h3>

                        {/* RAHASIANYA DI SINI: 
                           1. 'w-fit': Lebar list mengikuti teks terpanjang (bukan full width).
                           2. Karena parent-nya 'items-center', maka kotak list ini akan ada di tengah.
                        */}
                        <ul className="space-y-3 w-fit flex flex-col">
                            {['Beranda', 'Tentang Kami', 'Menu & Harga', 'Ulasan Pelanggan'].map((name, idx) => (
                                <li key={idx} className="w-full hover:text-yellow-300">
                                    {/* 💡 SOLUSI: GANTI <button> DENGAN <a> DAN TAMBAHKAN href */}
                                    <a
                                        href={
                                            name === 'Beranda' ? '/' : // Contoh: Beranda ke root
                                                name === 'Tentang Kami' ? '/about' : // Contoh: Tentang Kami ke /tentang
                                                    name === 'Menu & Harga' ? '/menu-lengkap' : // Contoh: Menu & Harga ke /menu
                                                        name === 'ulasan pelanggan' ? '/ulasan' : // Contoh: Menu & Harga ke /menu
                                                            '#' // Fallback jika tidak ada halaman
                                        }
                                        className="group flex items-center text-left hover:text-yellow-300 transition-colors duration-300"
                                    >
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM 3 */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="text-xl font-bold text-white mb-6 tracking-wide border-b-2 border-yellow-400 pb-1 inline-block">Hubungi Kami</h3>
                        <div className="space-y-4 mb-8 w-full flex flex-col items-center md:items-end">
                            <a href="https://wa.me/6285179778270" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors">
                                <span className="text-lg font-semibold">+62 851-7977-8270</span>
                                <Phone className="w-5 h-5" />
                            </a>
                            <a href="mailto:ayamkabogor@gmail.com" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors">
                                <span>ayamkabogor@gmail.com</span>
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/ayam_kabogor" className="bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"><Instagram className="w-5 h-5 text-white" /></a>
                            <a href="https://www.facebook.com/share/v/1C33F3uYdi/" className="bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"><Facebook className="w-5 h-5 text-white" /></a>
                        </div>
                    </div>
                </div>
                <div className="text-center  pt-16 ">
                    <p>&copy; {currentYear} <span className="text-orange-100 font-bold">Ayam Kabogor</span>. All Rights Reserved.</p>
                </div>
            </div>

            {/* COPYRIGHT */}

        </footer>
    );
};

export default Footer;