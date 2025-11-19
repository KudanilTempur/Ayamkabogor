import React from 'react';
import { FaStar, FaThumbsUp } from 'react-icons/fa';

// Kalau punya gambar profil sendiri, import di sini.
// Sementara saya pakai link gambar online sebagai contoh.
const avatar1 = "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop";
const avatar2 = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop";

const UlasanPelanggan = () => {
    const reviews = [
        {
            id: 1,
            name: "Ms. Chick",
            date: "01 OKT 2022",
            text: "Akhirnya nemu tempat makan ayam kampung yang rasanya otentik! Tadi coba yang ayam goreng serundeng. Ya ampun, serundengnya aja udah enak banget dimakan pakai nasi. Ayamnya gurih, nggak berminyak berlebihan. Rasanya 'bersih' dan beneran kayak masakan rumahan premium. Tempatnya juga bersih. Highly recommended buat yang kangen masakan ayam kampung asli.",
            likes: 356,
            stars: 5,
            avatar: avatar1
        },
        {
            id: 2,
            name: "Pak Kuyam",
            date: "03 NOV 2021",
            text: "Luar biasa. Saya pesan yang ayam bakar. Bumbu bakarnya itu pas banget, manis gurihnya seimbang dan ada aroma smoky yang enak. Yang paling saya suka, dagingnya nggak alot sama sekali padahal ini ayam kampung. Empuk tapi juicy. Sambal bawangnya bikin nambah nasi terus. Nggak mengecewakan!",
            likes: 289,
            stars: 5,
            avatar: avatar2
        }
    ];

    return (
        // Background Section: Oranye Bertekstur (Mirip meja kayu/warna ayam goreng)
        <section className="w-full py-16 px-4 bg-orange-600">

            <div className="max-w-5xl mx-auto">

                {/* 1. JUDUL: ULASAN PELANGGAN */}
                <div className="text-center mb-12">
                    <h2
                        className="text-4xl md:text-6xl font-black uppercase italic tracking-wide transform -skew-x-6"
                        style={{
                            // Gradient Text Kuning ke Oranye
                            background: 'linear-gradient(to bottom, #FFF700, #FF8C00)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Stroke/Garis Pinggir Merah Bata
                            filter: 'drop-shadow(2px 2px 0px #8B0000)'
                        }}
                    >
                        ULASAN PELANGGAN
                    </h2>
                </div>

                {/* 2. LIST KARTU ULASAN */}
                <div className="flex flex-col gap-6">
                    {reviews.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#FFCB74] rounded-2xl p-6 md:p-8 shadow-xl relative border-b-4 border-orange-800/20"
                        >
                            {/* Header Kartu: Avatar & Nama & Bintang */}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">

                                {/* Kiri: Foto & Nama */}
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600 shadow-sm">
                                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-black leading-tight">{item.name}</h3>
                                        <p className="text-xs text-gray-600 font-medium">{item.date}</p>
                                    </div>
                                </div>

                                {/* Kanan: Bintang */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-[#D32F2F] drop-shadow-sm" size={24} />
                                    ))}
                                </div>
                            </div>

                            {/* Body Text */}
                            <p className="text-black text-sm md:text-base leading-relaxed mb-6 text-justify font-medium opacity-90">
                                {item.text}
                            </p>

                            {/* Footer: Tombol Suka */}
                            <div className="flex items-center justify-end gap-2 text-black font-bold text-xs md:text-sm opacity-80 hover:opacity-100 cursor-pointer transition">
                                <FaThumbsUp size={18} className="mb-1" />
                                <span>{item.likes} SUKA KOMEN INI</span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default UlasanPelanggan;