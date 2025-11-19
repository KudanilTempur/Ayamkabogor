import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const PunyaPertanyaan = () => {
    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-orange-600 to-orange-700 py-16 flex items-center justify-center px-4">

            {/* Card */}
            <div className="max-w-2xl w-full bg-orange-800/50 backdrop-blur-sm rounded-3xl border-2 border-yellow-600 p-6 md:p-12 text-center shadow-2xl">

                {/* Title */}
                <h2 className="text-yellow-200 text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                    Punya Pertanyaan?
                </h2>

                {/* Description */}
                {/* PERBAIKAN 1: Menambahkan {' '} (Spasi Paksa) sebelum <br> agar tulisan tidak menempel di HP */}
                <p className="text-white text-base md:text-xl lg:text-2xl mb-8 leading-relaxed">
                    Anda Punya Pertanyaan Lebih Lanjut{' '}
                    <br className="hidden md:block" />
                    Tentang Produk Kami? Silakan Bertanya{' '}
                    <br className="hidden md:block" />
                    Ke Nomor Whatsapp Berikut!
                </p>

                {/* TOMBOL WHATSAPP */}
                <a
                    href="https://wa.me/6281281459999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center justify-center gap-2 
                        bg-yellow-500 hover:bg-yellow-400 
                        text-white 
                        
                        /* PERBAIKAN 2: Gunakan text-xs (sangat kecil) untuk HP kecil, text-sm untuk HP biasa, text-lg untuk Laptop */
                        text-xs sm:text-sm md:text-lg 
                        
                        font-semibold 
                        
                        /* Padding disesuaikan agar muat di layar sempit */
                        py-3 px-4 sm:px-6 md:px-8 
                        
                        rounded-full 
                        transition-transform hover:scale-105 shadow-lg
                        
                        /* Memaksa satu baris */
                        whitespace-nowrap
                    "
                >
                    <FaWhatsapp className="text-lg md:text-2xl" />
                    Hubungkan dengan Whatsapp
                </a>

            </div>

        </section>
    );
};

export default PunyaPertanyaan;