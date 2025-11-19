import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import logo from '../assets/logo-ayamkabogor.png'; // Pastikan path logo benar

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-white mt-20">

            {/* --- ORNAMEN GELOMBANG (WAVE) DI ATAS --- */}
            {/* Ini memberikan efek transisi yang mulus dan modern dari konten putih ke footer */}
            <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-orange-700"></path>
                </svg>
            </div>

            {/* --- KONTEN UTAMA (GRADIENT BACKGROUND) --- */}
            <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-orange-800 text-orange-50 pt-10 pb-8 px-6 md:px-12">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

                    {/* KOLOM 1: BRAND & ALAMAT */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        {/* Logo Container - PERBAIKAN: Menghapus background putih */}
                        <div className="mb-2">
                            <img
                                src={logo}
                                alt="Logo Ayam Kabogor"
                                className="h-20 w-auto object-contain filter drop-shadow-md" // Tambah drop-shadow agar logo putih lebih 'pop'
                            />
                        </div>

                        <p className="text-sm md:text-base leading-relaxed opacity-90">
                            Nikmati cita rasa ayam bakar dan goreng khas Bogor yang otentik. Bumbu meresap, sambal mantap!
                        </p>

                        <div className="flex items-start space-x-3 mt-4 opacity-90">
                            <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" />
                            <span className="text-sm">
                                Jl. Raya Bogor KM 42, Cibinong, <br />
                                Bogor, Jawa Barat 16911
                            </span>
                        </div>
                    </div>

                    {/* KOLOM 2: NAVIGASI CEPAT */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-bold text-white mb-6 tracking-wide border-b-2 border-yellow-400 pb-1 inline-block">
                            Akses Cepat
                        </h3>
                        <ul className="space-y-3 w-full text-center md:text-left">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Tentang Kami', href: '/about' },
                                { name: 'Menu & Harga', href: '/menu-lengkap' },
                                { name: 'Ulasan Pelanggan', href: '/ulasan' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center justify-center md:justify-start hover:text-yellow-300 transition-colors duration-300"
                                    >
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM 3: KONTAK & SOSIAL */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="text-xl font-bold text-white mb-6 tracking-wide border-b-2 border-yellow-400 pb-1 inline-block">
                            Hubungi Kami
                        </h3>

                        <div className="space-y-4 mb-8 w-full flex flex-col items-center md:items-end">
                            <a href="https://wa.me/628123456789" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors">
                                <span className="text-lg font-semibold">+62 812-3456-7890</span>
                                <Phone className="w-5 h-5" />
                            </a>
                            <a href="mailto:ayamkabogor@gmail.com" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors">
                                <span>ayamkabogor@gmail.com</span>
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
                                <Facebook className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- FOOTER BAWAH (COPYRIGHT) --- */}
            <div className="bg-orange-900 text-orange-200/60 py-4 text-center text-xs md:text-sm border-t border-orange-800">
                <p>
                    &copy; {currentYear} <span className="text-orange-100 font-bold">Ayam Kabogor</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;