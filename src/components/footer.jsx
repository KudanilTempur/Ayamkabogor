import React from 'react';
// Ikon yang dibutuhkan untuk media sosial dan kontak
// Catatan: Ikon 'Whatsapp' tidak tersedia di lucide-react. Menggantinya dengan ikon 'Phone' atau 'MessageCircle' atau 'Send'
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

// Gambar lokal tidak dapat dimuat di lingkungan ini, diganti dengan URL placeholder yang stabil.
// Ini adalah logo Ayam Kabogor (di-invert agar terlihat di latar belakang gelap)
const logoPlaceholder = "https://placehold.co/150x50/8B4513/ffffff?text=AYAM+KABOGOR";

const Footer = () => {
    // Data Akses Link
    const accessLinks = [
        { name: "Home", href: "#home" },
        { name: "About Us", href: "#about" },
        { name: "Menu", href: "#menu" },
        { name: "Review", href: "#review" },
        { name: "Order Now", href: "#order" },
    ];

    // Warna Cokelat Gelap khas footer (Berdasarkan contoh gambar)
    const brownColor = 'bg-[#8B4513]';
    // Warna teks terang untuk kontras
    const textColor = 'text-[#F5DEB3]';

    return (
        <footer className={`w-full ${brownColor} pt-12 pb-6`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8">

                {/* Kontainer Utama - Responsif 3 Kolom */}
                <div className="
                    flex flex-col gap-10 
                    md:flex-row md:justify-between 
                    md:items-start
                    pb-10
                ">

                    {/* Kolom 1: Hubungi Kami & Sosmed */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h3 className={`text-2xl font-semibold ${textColor} mb-2`}>Hubungi kami</h3>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            {/* Email yang terlihat di gambar */}
                            <p className={`text-lg ${textColor}/90`}>ayamkabogor@gmail.com</p>
                        </div>

                        {/* Ikon Media Sosial */}
                        <div className="flex space-x-4 mt-2">
                            {/* WhatsApp - Diganti dengan ikon 'Phone' atau yang paling mendekati (tergantung kebutuhan, di sini menggunakan Phone) */}
                            <a href="#" className={`p-2 rounded-full border border-current ${textColor} hover:text-white hover:border-white transition`}>
                                <Phone className="w-5 h-5" />
                            </a>
                            {/* Facebook */}
                            <a href="#" className={`p-2 rounded-full border border-current ${textColor} hover:text-white hover:border-white transition`}>
                                <Facebook className="w-5 h-5" />
                            </a>
                            {/* Instagram */}
                            <a href="#" className={`p-2 rounded-full border border-current ${textColor} hover:text-white hover:border-white transition`}>
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Akses Link */}
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <h3 className={`text-2xl font-semibold ${textColor} mb-2`}>Akses</h3>
                        {accessLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`text-lg ${textColor}/90 hover:text-white transition w-max`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Kolom 3: Logo dan Deskripsi (Rata Kanan di desktop) */}
                    <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-1/3">
                        {/* Logo Ayam Kabogor */}
                        <div className="flex items-center">
                            {/* Gambar placeholder, diasumsikan logo berwarna terang/putih */}
                            <img
                                src={logoPlaceholder}
                                alt="Ayam Kabogor Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </div>

                        {/* Deskripsi */}
                        <p className={`text-sm text-left md:text-right ${textColor}/70`}>
                            lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.
                        </p>
                    </div>

                </div>

                {/* Separator Line */}
                <div className={`border-t border-${textColor}/50 pt-4 mt-4`}></div>

                {/* Copyright */}
                <div className={`text-center ${textColor}/60 text-sm mt-4`}>
                    Copyright © 2025 ayam kabogor
                </div>

            </div>
        </footer>
    );
};

export default Footer;