import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// DATA GAMBAR
const tumpengImages = [
    "https://placehold.co/800x450/F4A460/333333?text=Tumpeng+Spesial",
    "https://placehold.co/800x450/DEB887/333333?text=Tumpeng+Mini",
    "https://placehold.co/800x450/CD853F/333333?text=Tumpeng+Acara",
];
const totalSlides = tumpengImages.length;

const HeroMenu = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fungsi Navigasi
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === totalSlides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Opsional: Auto Slide setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section className="py-8 md:py-16 bg-[#FFF6E7]">
            {/* Container: px-0 di HP (agar full width), px-4 di tablet ke atas */}
            <div className="max-w-5xl mx-auto px-0 md:px-4 relative group">

                {/* KOTAK GAMBAR UTAMA */}
                {/* Perubahan Responsif:
                    1. aspect-[4/3] di HP: Agar agak kotak & gambar lebih terlihat di layar sempit
                    2. md:aspect-[21/9] atau md:h-[450px]: Agar melebar sinematik di Desktop
                    3. md:rounded-2xl: Sudut membulat hanya di desktop, di HP kotak penuh
                */}
                <div className="w-full aspect-[4/3] sm:aspect-video md:h-[450px] md:aspect-auto overflow-hidden relative md:rounded-2xl shadow-lg">

                    {/* Wrapper Slide */}
                    <div
                        className="w-full h-full flex transition-transform ease-out duration-700"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {tumpengImages.map((src, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0 relative">
                                <img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Gradasi Tipis di Bawah (Supaya teks putih terbaca jika ada) */}
                                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                        ))}
                    </div>

                    {/* --- TOMBOL NAVIGASI (Panah) --- */}
                    {/* Hidden di HP (biar bersih), Muncul di Tablet/Desktop (md:flex).
                        Atau bisa dibuat kecil di HP. Di sini saya buat kecil di HP.
                    */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10 
                                   p-1 md:p-2 rounded-full bg-white/30 hover:bg-white/80 backdrop-blur-sm
                                   text-white hover:text-orange-600 transition-all duration-300 border border-white/20"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10 
                                   p-1 md:p-2 rounded-full bg-white/30 hover:bg-white/80 backdrop-blur-sm
                                   text-white hover:text-orange-600 transition-all duration-300 border border-white/20"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* --- INDIKATOR TITIK (DOTS) DI BAWAH --- */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {tumpengImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`
                                    transition-all duration-300 rounded-full shadow-sm
                                    ${currentIndex === index
                                        ? 'w-8 h-2 bg-orange-500' // Titik Aktif (panjang)
                                        : 'w-2 h-2 bg-white/60 hover:bg-white' // Titik Inaktif (bulat)
                                    }
                                `}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroMenu;