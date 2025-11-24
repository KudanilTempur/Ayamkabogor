// src/components/MenuHariIni.jsx

import React from 'react';
import ayamBakarKecap from '../assets/ayam-kampung-bakar-kecap.jpeg'; // Ganti dengan path gambar Anda

const MenuHariIni = () => {
    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-orange-400 to-orange-700 py-16 flex items-center justify-center">

            {/* Container */}
            <div className="max-w-4xl mx-auto px-4 w-full">

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                        <span className="text-orange-800 italic font-serif">Menu</span>
                        {' '}
                        <span className="text-white font-black uppercase tracking-wider"
                            style={{
                                textShadow: '2px 2px 0px rgba(139, 69, 19, 0.3)',
                                WebkitTextStroke: '2px rgba(139, 69, 19, 0.2)'
                            }}>
                            HARI INI
                        </span>
                    </h2>
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">

                        {/* Image */}
                        <div className="w-full md:w-1/3 flex-shrink-0">
                            <div className="relative">
                                <img
                                    src={ayamBakarKecap}
                                    alt="Ayam Bakar Kecap"
                                    className="w-full h-64 md:h-72 object-cover rounded-2xl shadow-xl"
                                />

                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-white">
                            <h3 className="text-4xl md:text-5xl font-bold mb-4 italic"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                Ayam Bakar Kecap
                            </h3>
                            <p className="text-lg md:text-xl leading-relaxed mb-6 font-normal">
                                Daging Ayam Kampung yang padat, dibakar dengan bumbu homemade
                                rahasia kami. 100% Halal, rasa otentik, dijamin bikin nagih!
                            </p>


                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default MenuHariIni;