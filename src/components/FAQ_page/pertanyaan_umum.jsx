import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-16 px-4 bg-orange-50 min-h-screen flex flex-col items-center">
            <div className="max-w-3xl w-full">

                {/* --- JUDUL MODERN --- */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-3 bg-gradient-to-r from-orange-800 via-orange-600 to-orange-800 bg-clip-text text-transparent">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        Hal-hal yang sering ditanyakan oleh pelanggan kami
                    </p>
                    <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full mt-4"></div>
                </div>

                {/* --- LIST PERTANYAAN --- */}
                <div className="space-y-4">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`
                                    group rounded-xl overflow-hidden transition-all duration-300 border
                                    ${isOpen
                                        ? 'border-orange-500 shadow-lg bg-white ring-2 ring-orange-200'
                                        : 'border-orange-100 bg-white hover:border-orange-300 shadow-sm'
                                    }
                                `}
                            >
                                {/* HEADER TOMBOL */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`
                                        w-full flex items-center justify-between px-6 py-5 
                                        text-left font-bold text-base md:text-lg transition-all duration-300
                                        ${isOpen
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-white text-gray-700 group-hover:text-orange-600'
                                        }
                                    `}
                                >
                                    <span>{item.question}</span>

                                    {/* Ikon Panah dengan Animasi Putar */}
                                    <ChevronDown
                                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-gray-400 group-hover:text-orange-500'}`}
                                    />
                                </button>

                                {/* ISI JAWABAN */}
                                <div
                                    className={`
                                        transition-all duration-300 ease-in-out overflow-hidden
                                        ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                                    `}
                                >
                                    <div className="p-6 text-gray-600 text-sm md:text-base leading-relaxed bg-orange-50/30">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PertanyaanUmum;