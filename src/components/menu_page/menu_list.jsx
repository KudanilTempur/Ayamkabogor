import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';

// ✅ IMPORT CONTEXT (Tidak berubah)
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';

const MenuList = () => {
    const { addToCart, cart, getTotalItems } = useCart();
    const { menus } = useMenu();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredMenu = menus.filter(item => {
        const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const categories = ["Semua", "Makanan", "Minuman", "Paket", "Camilan"];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-20 px-2 md:px-4 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- HEADER & PENCARIAN --- */}
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-2xl md:text-4xl font-black text-orange-800 mb-4">
                        DAFTAR MENU
                    </h1>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative px-2">
                        <input
                            type="text"
                            placeholder="Cari menu..."
                            className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-5 md:left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    {/* Kategori Filter */}
                    <div className="flex overflow-x-auto pb-2 pt-4 gap-2 px-2 md:justify-center scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${selectedCategory === cat
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- LIST MENU (GRID SYSTEM) --- */}
                {filteredMenu.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-sm md:text-lg">Menu tidak ditemukan.</p>
                    </div>
                ) : (
                    // 🔥 PERUBAHAN UTAMA DI SINI: grid-cols-2 (HP) -> grid-cols-4 (Desktop)
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {filteredMenu.map(item => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">

                                {/* Gambar Menu */}
                                <div className="relative w-full aspect-square bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Badge Kategori (Kecil di pojok) */}
                                    <span className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-orange-700 shadow-sm">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Info Menu */}
                                <div className="p-3 flex flex-col flex-1">
                                    {/* Nama Menu (Dibatasi 2 baris agar rapi) */}
                                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 h-10 leading-tight">
                                        {item.name}
                                    </h3>

                                    {/* Harga & Tombol */}
                                    <div className="mt-auto flex items-center justify-between pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 line-through hidden">Rp {Math.round(item.price * 1.2).toLocaleString('id-ID')}</span>
                                            <span className="text-sm md:text-lg font-bold text-orange-600">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </span>
                                        </div>

                                        {/* Tombol Add Cart Kecil */}
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="bg-orange-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-orange-700 active:scale-90 transition shadow-sm"
                                        >
                                            <ShoppingCart size={16} className="md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuList;