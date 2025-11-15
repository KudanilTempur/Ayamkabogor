import React from 'react';
import { Home, Bird, Award } from 'lucide-react';
// Gambar lokal tidak dapat dimuat di lingkungan ini, diganti dengan URL placeholder yang stabil.
import ayamImagePlaceholder from '../assets/ayam-kampung-bakar-kecap.jpeg';

const Keunggulan = () => {
    const features = [
        {
            // Menambahkan kelas responsif pada ikon
            icon: <Home className="w-10 h-10 md:w-12 md:h-12" />,
            title: "RUMAHAN",
            description: "Diproduksi sendiri dengan proses yang higienis"
        },
        {
            icon: <Bird className="w-10 h-10 md:w-12 md:h-12" />,
            title: "SEHAT",
            description: "Menggunakan ayam kampung yang cenderung lebih sehat"
        },
        {
            icon: <Award className="w-10 h-10 md:w-12 md:h-12" />,
            title: "HALAL",
            description: "Halal 100% tanpa keraguan. Sudah bersertifikat MUI"
        }
    ];

    return (
        <section className="
            relative 
            w-full 
            min-h-fit /* Mengganti h-screen agar tinggi adaptif */
            flex items-center justify-center
            py-16 md:py-24 /* Menambah padding vertikal untuk ruang */
            overflow-hidden
        ">
            {/* Background dengan gambar ayam */}
            <div className="absolute inset-0">
                <img
                    src={ayamImagePlaceholder} /* Menggunakan placeholder */
                    alt="Ayam Kampung Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                {/* Gradient bottom overlay - Diubah menjadi 'to-t' (dari bawah ke atas) dan warna lebih gelap untuk kontras */}
                <div className=' absolute inset-0 bg-gradient-to-t from-orange-800/70 via-transparent to-transparent'></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">

                {/* Judul ditambahkan di React untuk konteks visual */}
                <h2 className="text-white text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 md:mb-16">
                    Mengapa Memilih Produk Kami?
                </h2>

                {/* Kontainer Keunggulan - Menggunakan Flex Wrap untuk Mobile/Tablet */}
                <div className="
                    flex flex-wrap 
                    justify-center 
                    gap-4 md:gap-8 /* Gap disesuaikan */
                    lg:grid lg:grid-cols-3 /* Grid 3 kolom hanya di desktop */
                ">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="
                                w-full sm:w-[48%] lg:w-auto /* Kunci Responsif: 2 kolom di layar 'sm' */
                                bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 
                                rounded-2xl p-6 md:p-8 /* Padding disesuaikan */
                                flex flex-col items-center text-center 
                                shadow-2xl transform hover:scale-105 transition-all duration-300
                            "
                        >
                            {/* Icon Circle */}
                            <div className="bg-white rounded-full p-4 md:p-5 mb-4 md:mb-5 shadow-lg">
                                <div className="text-orange-500">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title - Ukuran teks disesuaikan */}
                            <h3 className="text-white text-lg sm:text-xl font-bold mb-2 tracking-wider uppercase">
                                {feature.title}
                            </h3>

                            {/* Description - Ukuran teks disesuaikan */}
                            <p className="text-white/95 text-xs sm:text-sm leading-snug">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Keunggulan;