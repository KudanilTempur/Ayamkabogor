// src/components/HeroSection.jsx

import React from 'react';
import HeroImage from '../assets/ayamkabogor-Hero.png';

const HeroSection = () => {
    return (
        <section
            className="
                relative 
                w-full h-screen 
                flex items-center justify-center
                overflow-hidden 
            "
        >
            {/* 1. Gambar Latar Belakang & Overlay */}
            <div className="absolute inset-0">
                <img
                    src={HeroImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* 2. Konten Teks dan CTA */}
            <div className="relative z-10 text-white text-center px-4">
                {/* Teks AYAM */}
                <h1
                    className="
                        text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
                        font-extrabold leading-none tracking-tight 
                        uppercase 
                        text-stroke-2 
                    "
                >
                    AYAM
                </h1>

                {/* Teks KABOGOR */}
                <h1
                    className="
                        text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
                        font-extrabold leading-none tracking-tight 
                        uppercase 
                        text-stroke-2 
                    "
                >
                    KABOGOR
                </h1>
            </div>
        </section>
    );
};

export default HeroSection;