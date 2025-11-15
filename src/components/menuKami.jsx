import React from 'react';

// Ini adalah kode yang kita pindahkan dari MenuLengkapPage.jsx
const MenuKami = () => (
    <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">
                Menu Kami
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Nasi Putih', 'Tahu', 'Tempe', 'Sambal'].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4 text-center shadow-lg transform transition-transform hover:scale-105">
                        {/* Placeholder untuk gambar */}
                        <div
                            className="w-full h-24 bg-gray-300 rounded mb-2 flex items-center justify-center text-gray-500"
                            style={{
                                backgroundImage: `url(https://placehold.co/150x150/EEEEEE/AAAAAA?text=${item})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800">{item}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default MenuKami;