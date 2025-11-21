import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, RefreshCw, UtensilsCrossed, Frown } from 'lucide-react';

// ============================================================================
// ⚠️ PERHATIAN UNTUK PENGGUNAAN DI LAPTOP ⚠️
// Saat di-copy ke VS Code, LAKUKAN HAL BERIKUT:
// 1. HAPUS bagian "MOCK DATA & HOOKS" di bawah ini.
// 2. UNCOMMENT (aktifkan) bagian "REAL IMPORTS" di bawahnya.
// ============================================================================

// --- [MOCK DATA & HOOKS] UNTUK PREVIEW DI SINI SAJA ---
const MOCK_MENUS = [
    { id: 1, name: "Ayam Bakar Madu", price: 25000, category: "Makanan", description: "Ayam bakar dengan olesan madu spesial.", image: "https://placehold.co/400x400/orange/white?text=Ayam+Bakar" },
    { id: 2, name: "Ayam Goreng Serundeng", price: 22000, category: "Makanan", description: "Ayam goreng gurih dengan taburan serundeng.", image: "https://placehold.co/400x400/orange/white?text=Ayam+Goreng" },
    { id: 3, name: "Es Jeruk Segar", price: 8000, category: "Minuman", description: "Perasan jeruk asli menyegarkan.", image: "https://placehold.co/400x400/orange/white?text=Es+Jeruk" },
    { id: 4, name: "Sambal Dadak", price: 5000, category: "Tambahan", description: "Sambal super pedas buat kamu.", image: "https://placehold.co/400x400/orange/white?text=Sambal" },
];

const useMenu = () => ({
    menus: MOCK_MENUS,
    isLoading: false,
    error: null,
    fetchMenus: () => console.log("Refetching menus...")
});

const useCart = () => ({
    addToCart: (item) => alert(`MOCK: Menambahkan ${item.name} ke keranjang`)
});
// ---------------------------------------------------------------------------


// --- [REAL IMPORTS] UNTUK DI LAPTOP ANDA (UNCOMMENT BAGIAN INI) ---
// import { useMenu } from '../context/MenuContext';
// import { useCart } from '../context/CartContext';
// ------------------------------------------------------------------

const MenuPage = () => {
    // Menggunakan Mock Hook (Ganti dengan Real Hook saat di laptop)
    const { menus, isLoading, error, fetchMenus } = useMenu();
    const { addToCart } = useCart();

    // State Lokal untuk Filter & Search
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // ✅ State untuk mengecek status login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ✅ Cek status login saat halaman dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');
        // Jika ada token, anggap user sudah login
        setIsLoggedIn(!!token);
    }, []);

    // --- LOGIKA FILTERING ---
    const filteredData = useMemo(() => {
        return menus.filter(item => {
            const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
            const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [menus, selectedCategory, searchTerm]);

    // Ambil daftar kategori unik dari data menu
    const categories = ["Semua", ...new Set(menus.map(item => item.category))];

    return (
        <div className="min-h-screen bg-orange-50/30 pt-20 pb-20 px-4 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER SECTON --- */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-orange-800 mb-4 tracking-tight">
                        DAFTAR MENU
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Nikmati aneka olahan ayam dan sambal khas Bogor yang menggugah selera.
                        Pilih menu favoritmu sekarang!
                    </p>

                    {/* TOMBOL LOGIN SEMENTARA (Agar Anda bisa tes fitur cart di preview ini) */}
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                if (isLoggedIn) {
                                    localStorage.removeItem('token');
                                    setIsLoggedIn(false);
                                } else {
                                    localStorage.setItem('token', 'dummy-token');
                                    setIsLoggedIn(true);
                                }
                            }}
                            className="text-xs text-blue-500 underline"
                        >
                            [Preview Mode] {isLoggedIn ? "Logout (Sembunyikan Cart)" : "Login (Tampilkan Cart)"}
                        </button>
                    </div>
                </div>

                {/* --- CONTROLS (Search & Filter) --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 mb-8 sticky top-20 z-30">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        {/* Kategori (Horizontal Scroll) */}
                        <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                            <div className="flex gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                            ? 'bg-orange-600 text-white shadow-md transform scale-105'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search & Refresh */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari menu lezat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>

                            <button
                                onClick={fetchMenus}
                                disabled={isLoading}
                                className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors disabled:opacity-50"
                                title="Refresh Data"
                            >
                                <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}

                {/* 1. Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
                        <p className="text-gray-500 animate-pulse">Sedang menyiapkan menu terbaik...</p>
                    </div>
                )}

                {/* 2. Error State */}
                {error && !isLoading && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-lg mx-auto">
                        <Frown className="mx-auto text-red-500 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-red-700 mb-2">Oops, gagal memuat menu!</h3>
                        <p className="text-red-600 mb-4 text-sm">{error}</p>
                        <button
                            onClick={fetchMenus}
                            className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {/* 3. Empty State (Hasil pencarian 0) */}
                {!isLoading && !error && filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                            <UtensilsCrossed className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">Menu tidak ditemukan</h3>
                        <p className="text-gray-500">Coba cari dengan kata kunci lain atau ganti kategori.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedCategory("Semua"); }}
                            className="mt-4 text-orange-600 font-semibold hover:underline"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}

                {/* 4. Product Grid */}
                {!isLoading && !error && filteredData.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            // Ganti dengan placeholder jika gambar error/tidak ada
                                            e.target.src = "https://placehold.co/400x400/orange/white?text=Ayam+Kabogor";
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-800 shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1" title={item.name}>
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400">Harga</span>
                                            <span className="text-lg font-black text-orange-600">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </span>
                                        </div>

                                        {/* ✅ Hanya tampilkan tombol Add to Cart jika sudah login */}
                                        {isLoggedIn && (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-700 active:scale-90 transition-all"
                                                title="Tambah ke Keranjang"
                                            >
                                                <ShoppingCart size={18} />
                                            </button>
                                        )}
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

export default MenuPage;