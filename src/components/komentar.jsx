// src/components/KataMereka.jsx

import React, { useState } from 'react';

const Komentar = () => {
    const [currentTestimoni, setCurrentTestimoni] = useState(0);

    // Data testimoni
    const testimoniData = [
        {
            id: 1,
            name: "You • Sep 2024",
            message: "o ya kemarin ayam bakarnya enak.... pedasnya sopan😂😂 sehingga saya bisa makan. Anak saya tidak suka ayam tapi kemarin yang kremes dan bakar dia suka sekali 👍👍",
            time: "09:32"
        },
        {
            id: 2,
            name: "Masya",
            message: "Masya Allah kak, ayamnya kampung banget, empuk, sukaa banget deh pokoknya. Selama di kampung gak pernah nemu ayam enak senak ini 😍",
            time: "10:18"
        },
        {
            id: 3,
            name: "Budi • Oct 2024",
            message: "Enak banget! Bumbunya meresap sempurna, ayamnya empuk. Pasti pesan lagi! 🔥",
            time: "14:20"
        },
        // Tambahkan testimoni lainnya...
    ];

    const nextTestimoni = () => {
        setCurrentTestimoni((prev) => (prev + 1) % testimoniData.length);
    };

    const prevTestimoni = () => {
        setCurrentTestimoni((prev) => (prev - 1 + testimoniData.length) % testimoniData.length);
    };

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-orange-700 via-orange-600 to-orange-900 py-16 flex items-center justify-center">

            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 w-full">

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-yellow-300 italic"
                        style={{
                            fontFamily: 'Brush Script MT, cursive',
                            textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
                            letterSpacing: '0.05em'
                        }}>
                        Kata Mereka
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="relative flex items-center justify-center gap-4">

                    {/* Left Card (Blur) - Hidden di tablet ke bawah */}
                    <div className="hidden lg:block flex-shrink-0 w-72 opacity-30 blur-sm transform scale-90">
                        <div className="bg-gray-200 rounded-3xl p-6 h-64">
                            <p className="text-gray-600 text-sm">
                                {testimoniData[(currentTestimoni - 1 + testimoniData.length) % testimoniData.length].message.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-400 text-right mt-4">
                                {testimoniData[(currentTestimoni - 1 + testimoniData.length) % testimoniData.length].time}
                            </p>
                        </div>
                    </div>

                    {/* Left Arrow */}
                    <button
                        onClick={prevTestimoni}
                        className="absolute left-0 lg:left-4 z-10 text-white hover:text-yellow-300 transition-colors bg-black/20 rounded-full p-2 hover:bg-black/40"
                        aria-label="Previous"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Center Card (Active) */}
                    <div className="flex-shrink-0 w-full max-w-xl transform scale-100 z-10">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-700">
                                        {testimoniData[currentTestimoni].name}
                                    </span>
                                </div>
                            </div>

                            {/* Message Bubble */}
                            <div className="bg-gray-100 rounded-2xl p-6 min-h-[200px] flex flex-col justify-between">
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    {testimoniData[currentTestimoni].message}
                                </p>
                                <p className="text-sm text-gray-400 text-right mt-4">
                                    {testimoniData[currentTestimoni].time}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextTestimoni}
                        className="absolute right-0 lg:right-4 z-10 text-white hover:text-yellow-300 transition-colors bg-black/20 rounded-full p-2 hover:bg-black/40"
                        aria-label="Next"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Right Card (Blur) - Hidden di tablet ke bawah */}
                    <div className="hidden lg:block flex-shrink-0 w-72 opacity-30 blur-sm transform scale-90">
                        <div className="bg-gray-200 rounded-3xl p-6 h-64">
                            <p className="text-gray-600 text-sm">
                                {testimoniData[(currentTestimoni + 1) % testimoniData.length].message.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-400 text-right mt-4">
                                {testimoniData[(currentTestimoni + 1) % testimoniData.length].time}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimoniData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTestimoni(index)}
                            className={`rounded-full transition-all ${index === currentTestimoni
                                ? 'bg-yellow-300 w-10 h-3'
                                : 'bg-white/50 w-3 h-3'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Komentar;