import React from 'react';
import { FaStar } from 'react-icons/fa';
import bgMakanan from '../../assets/ayam-kampung-bakar-kecap.jpeg';


// Data dummy ulasan
const reviews = [
    {
        id: 1,
        username: "Asep Surasep",
        text: "Ayamnya empuk banget sampe ke tulang! Sambalnya nendang parah.",
        stars: 5,
    },
    {
        id: 2,
        username: "Siti Aminah",
        text: "Rasanya otentik, bumbunya meresap. Wajib coba paket keluarganya.",
        stars: 5,
    },
    {
        id: 3,
        username: "Budi Santoso",
        text: "Pengiriman cepat, makanan masih hangat pas nyampe. Top markotop!",
        stars: 4,
    },
];

const KataMereka = () => {
    return (
        <section className="w-full bg-orange-50">

            {/* 1. BAGIAN JUDUL */}
            <div className="pt-12 pb-8 text-center bg-gradient-to-b from-orange-100 to-orange-50">
                <h2
                    className="text-5xl md:text-6xl font-black text-orange-400 uppercase tracking-wider"
                    style={{
                        // Teknik untuk membuat outline text (Stroke)
                        WebkitTextStroke: '2px #9a3412', // Warna stroke merah bata/coklat
                        textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
                    }}
                >
                    KATA MEREKA
                </h2>
            </div>

            {/* 2. BAGIAN CONTENT (Background Gambar) */}
            <div
                className="relative w-full py-10 px-4 flex flex-col items-center gap-6"
                style={{
                    // PERBAIKAN: Gunakan Backtick ( ` ) di awal dan akhir
                    backgroundImage: `url(${bgMakanan})`,

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                {/* Overlay Gelap/Oranye di atas gambar background agar tulisan terbaca */}
                <div className="absolute inset-0 bg-orange-900/60 backdrop-blur-[1px]"></div>

                {/* 3. LOOPING KARTU */}
                {reviews.map((review, index) => {

                    // Logika Selang-seling (Ganjil vs Genap)
                    const isSolid = index % 2 !== 0; // Jika index ganjil (ke-2), warnanya solid

                    return (
                        <div
                            key={review.id}
                            className={`
                        relative z-10 w-full max-w-2xl p-8 md:p-10 text-center
                        flex flex-col items-center justify-center
                        rounded-[3rem] md:rounded-[4rem] shadow-xl
                        transform transition hover:scale-105 duration-300
                        ${isSolid
                                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-orange-900" // Style Kartu Tengah (Solid)
                                    : "bg-black/40 backdrop-blur-sm text-white border border-white/10" // Style Kartu Atas/Bawah (Transparan)
                                }
                    `}
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-2">{review.username}</h3>
                            <p className="mb-4 text-sm md:text-base italic opacity-90">
                                "{review.text}"
                            </p>

                            {/* Bintang */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < review.stars ? "text-yellow-300 drop-shadow-md" : "text-gray-400"}
                                        size={24}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}

            </div>
        </section>
    );
};

export default KataMereka;