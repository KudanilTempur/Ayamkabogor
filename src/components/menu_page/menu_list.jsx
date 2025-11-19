// src/components/MenuKami.jsx

import React from 'react';

// Import gambar menu (Pastikan path/lokasi filenya benar sesuai folder kamu)
import menu1 from '../../assets/menu1.png';
import menu2 from '../../assets/menu2.png';
import menu3 from '../../assets/menu3.png';

const MenuList = () => {
    // Data menu
    const menuItems = [
        {
            id: 1,
            image: menu1,
            name: "Ikan Bakar",
            price: "Rp. 35.000"
        },
        {
            id: 2,
            image: menu2,
            name: "Ayam Bakar",
            price: "Rp. 30.000"
        },
        {
            id: 3,
            image: menu3,
            name: "Bebek Goreng",
            price: "Rp. 32.000"
        },
        {
            id: 4,
            image: menu1, // Contoh jika data diulang
            name: "Paket Hemat",
            price: "Rp. 25.000"
        },
    ];

    return (
        <section className="w-full py-12 px-4 bg-gradient-to-b from-orange-400 to-orange-600">

            {/* Title */}
            <div className="text-center mb-8">
                <h2 className="text-5xl md:text-7xl font-bold text-orange-900 italic tracking-wide"
                    style={{
                        fontFamily: 'Brush Script MT, cursive',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                    Menu Kami
                </h2>
            </div>

            {/* Menu Grid Container */}
            <div className="max-w-6xl mx-auto">
                {/* PERUBAHAN PENTING DISINI:
                   grid-cols-2 : Langsung 2 kolom di HP
                   gap-3       : Jarak antar kartu dirapatkan
                */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">

                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300"
                        >
                            {/* Image Container */}
                            {/* h-32 : Tinggi gambar di HP diperpendek biar ga makan tempat */}
                            <div className="w-full h-32 md:h-56 overflow-hidden bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            {/* Info Area */}
                            {/* Padding dikecilkan (py-3) agar kartu tidak "gendut" */}
                            <div className="bg-gradient-to-b from-orange-700 to-orange-800 text-white text-center py-3 px-2">
                                {/* Font size disesuaikan: text-sm di HP */}
                                <h3 className="text-sm md:text-xl font-bold mb-1 leading-tight">
                                    {item.name}
                                </h3>
                                <p className="text-xs md:text-base opacity-90 font-medium">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
};

export default MenuList;