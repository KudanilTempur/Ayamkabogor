// src/components/MenuPilihan.jsx

import React, { useState } from 'react';
import ayamGorengKremes from '../assets/ayam-goreng-kremes.jpeg';
import ayamKampungBakarKecap from '../assets/ayam-kampung-bakar-kecap.jpeg';

const MenuPilihan = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data menu (ganti dengan data asli Anda)
    const menuItems = [
        {
            id: 1,
            name: "Ayam Goreng Kremes",
            location: "KABOGOR",
            image: ayamGorengKremes,
            rating: 5
        },
        {
            id: 2,
            name: "Menu Item 2",
            location: "KABOGOR",
            image: ayamKampungBakarKecap,
            rating: 5
        },
        // Tambahkan menu lainnya...
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % menuItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    };

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFF6E7] to-[#FFD580] py-16">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    <span className="text-orange-700 italic font-serif">Menu</span>
                    <br />
                    <span className="text-orange-600 font-black uppercase text-5xl md:text-6xl lg:text-7xl"
                        style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.2)' }}>
                        PILIHAN KAMI
                    </span>
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-center gap-8">

                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:block text-orange-600 hover:text-orange-700 transition-colors"
                        aria-label="Previous"
                    >
                        <svg className="w-12 h-12 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Card */}
                    <div className="relative w-full max-w-md">

                        {/* Product Image */}
                        <div className="relative mb-6">
                            <img
                                src={menuItems[currentSlide].image}
                                alt={menuItems[currentSlide].name}
                                className="w-full h-[320px] md:h-[580px]  object-cover rounded-2xl"
                            />
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className="w-10 h-10 text-yellow-400 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>

                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:block text-orange-600 hover:text-orange-700 transition-colors"
                        aria-label="Next"
                    >
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                </div>

                {/* Mobile Navigation Buttons */}
                <div className="flex md:hidden justify-center gap-4 mt-8">
                    <button
                        onClick={prevSlide}
                        className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors"
                    >
                        ← Previous
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors"
                    >
                        Next →
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {menuItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-orange-600 w-8'
                                : 'bg-orange-300'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuPilihan;