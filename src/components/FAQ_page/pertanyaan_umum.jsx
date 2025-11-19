import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// DATA PERTANYAAN DAN JAWABAN (Bisa ditambah sesuka hati)
const faqData = [
    {
        question: "Apakah Ayam Kabogor sudah bersertifikasi Halal?",
        answer: "Tentu saja! Seluruh bahan dan proses pengolahan di Ayam Kabogor dijamin 100% Halal dan higienis."
    },
    {
        question: "Berapa minimal pemesanan untuk nasi kotak?",
        answer: "Minimal pemesanan untuk nasi kotak adalah 10 porsi. Untuk pemesanan dalam jumlah besar (di atas 50 porsi), mohon konfirmasi H-3."
    },
    {
        question: "Apakah bisa delivery order?",
        answer: "Ya, kami menyediakan layanan pesan antar melalui kurir internal maupun aplikasi ojek online (GoFood, GrabFood, ShopeeFood)."
    },
    {
        question: "Bagaimana cara memesan tumpeng?",
        answer: "Pemesanan tumpeng sebaiknya dilakukan H-2 acara. Anda bisa menghubungi kami via WhatsApp untuk konsultasi ukuran dan lauk."
    },
    {
        question: "Apakah tersedia area parkir yang luas?",
        answer: "Ya, outlet kami memiliki area parkir yang cukup luas untuk menampung mobil dan motor pengunjung."
    }
];

const PertanyaanUmum = () => {
    // State untuk melacak pertanyaan mana yang sedang terbuka (null = tertutup semua)
    const [openIndex, setOpenIndex] = useState(null);

    // Fungsi untuk membuka/menutup (toggle)
    const toggleFAQ = (index) => {
        // Jika yang diklik sudah terbuka, maka tutup (set null). Jika belum, buka index tersebut.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        // BACKGROUND KREM (Sesuai gambar)
        <section className="w-full py-16 px-4 bg-gradient-to-b from-orange-50 to-orange-600 min-h-screen flex flex-col items-center">

            <div className="max-w-3xl w-full">

                {/* --- JUDUL --- */}
                <div className="text-center mb-10">
                    <h2
                        className="text-4xl md:text-6xl font-black italic uppercase tracking-wider mb-2"
                        style={{
                            // Gradient Cokelat Tua ke Emas (Mirip di gambar)
                            background: 'linear-gradient(to bottom, #8B4513, #CD853F)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Shadow agar terlihat timbul
                            filter: 'drop-shadow(2px 2px 1px rgba(0,0,0,0.2))'
                        }}
                    >
                        PERTANYAAN UMUM
                    </h2>
                    {/* Garis hiasan di bawah judul */}
                    <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full mt-2"></div>
                </div>

                {/* --- LIST PERTANYAAN --- */}
                <div className="flex flex-col space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="w-full">

                            {/* TOMBOL (HEADER) */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={`
                                    w-full flex items-center justify-between px-6 py-4 
                                    bg-gradient-to-r from-orange-500 to-orange-400
                                    text-white font-bold text-lg md:text-xl text-left
                                    shadow-md hover:shadow-lg hover:scale-[1.01] 
                                    transition-all duration-300 rounded-xl
                                    ${openIndex === index ? 'rounded-b-none' : ''} // Jika terbuka, sudut bawah jadi siku
                                `}
                            >
                                <span>{item.question}</span>
                                {/* Ikon Panah Berubah Arah */}
                                {openIndex === index ? (
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <ChevronUp className="w-6 h-6 text-white" />
                                    </div>
                                ) : (
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <ChevronDown className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </button>

                            {/* ISI JAWABAN (ANIMASI BUKA TUTUP) */}
                            <div
                                className={`
                                    overflow-hidden transition-all duration-500 ease-in-out
                                    bg-white border-x border-b border-orange-200 rounded-b-xl
                                    ${openIndex === index ? 'max-h-40 opacity-100 p-6' : 'max-h-0 opacity-0 p-0 border-none'}
                                `}
                            >
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PertanyaanUmum;