import React, { useState } from 'react';
// Tidak perlu impor Swiper, kita buat manual
import { ChevronLeft, ChevronRight } from 'lucide-react';

// DATA GAMBAR (Sama seperti sebelumnya)
const tumpengImages = [
    "https://placehold.co/800x450/F4A460/333333?text=Tumpeng+Spesial",
    "https://placehold.co/800x450/DEB887/333333?text=Tumpeng+Mini",
    "https://placehold.co/800x450/CD853F/333333?text=Tumpeng+Acara",
];
// Total gambar
const totalSlides = tumpengImages.length;

const HeroMenu = () => {
    // 1. State untuk melacak slide yang aktif
    const [currentIndex, setCurrentIndex] = useState(0);

    // 2. Fungsi untuk ke slide sebelumnya (mundur)
    const prevSlide = () => {
        // Jika di slide pertama (0), putar ke slide terakhir
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // 3. Fungsi untuk ke slide berikutnya (maju)
    const nextSlide = () => {
        // Jika di slide terakhir, putar ke slide pertama (0)
        const isLastSlide = currentIndex === totalSlides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <section className="py-12 md:py-16 bg-[#FFF6E7]">
            <div className="max-w-5xl mx-auto px-4 relative">

                {/* Kontainer Gambar Utama */}
                <div className="rounded-lg shadow-lg overflow-hidden relative h-[300px] md:h-[450px]">
                    {/* Wrapper untuk semua slide (yang akan bergerak) */}
                    <div
                        className="flex transition-transform ease-in-out duration-500"
                        // 4. Logika Pergerakan: Geser sumbu X berdasarkan index
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {/* 5. Render semua gambar di dalam wrapper */}
                        {tumpengImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Tumpeng ${index + 1}`}
                                className="w-full h-full object-cover flex-shrink-0" // flex-shrink-0 PENTING
                            />
                        ))}
                    </div>
                </div>

                {/* Tombol Navigasi Kustom (Sesuai Desain) */}
                {/* 6. Tombol sekarang memanggil fungsi prevSlide dan nextSlide */}
                <button
                    onClick={prevSlide}
                    className="
            absolute top-1/2 -translate-y-1/2 left-4 z-10
            w-10 h-10 md:w-12 md:h-12 bg-orange-600/80 text-white rounded-md
            flex items-center justify-center hover:bg-orange-700 transition-colors
          "
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="
            absolute top-1/2 -translate-y-1/2 right-4 z-10
            w-10 h-10 md:w-12 md:h-12 bg-orange-600/80 text-white rounded-md
            flex items-center justify-center hover:bg-orange-700 transition-colors
          "
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

            </div>
        </section>
    );
};

export default HeroMenu;