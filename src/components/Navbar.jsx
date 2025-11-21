import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, User, History, LogOut, ShoppingCart } from 'lucide-react';

// ============================================================================
// ⚠️ PERHATIAN UNTUK PENGGUNAAN DI LAPTOP ⚠️
// Saat di-copy ke VS Code, LAKUKAN HAL BERIKUT:
// 1. HAPUS bagian "MOCK DATA" di bawah ini.
// 2. UNCOMMENT (aktifkan) bagian "REAL IMPORTS" di bawahnya.
// ============================================================================

// --- [MOCK DATA] UNTUK PREVIEW DI SINI SAJA (HAPUS BAGIAN INI DI LAPTOP) ---
// Menggunakan URL placeholder agar tidak error di preview
import logo from '../assets/logo-ayamkabogor.png';
// Simulasi useCart agar tidak error di preview
const useCart = () => ({
    getTotalItems: () => 3, // Contoh ada 3 item
    clearCart: () => console.log("Cart cleared")
});
// ---------------------------------------------------------------------------


// --- [REAL IMPORTS] UNTUK DI LAPTOP ANDA (UNCOMMENT BAGIAN INI) ---
// import { useCart } from '../context/CartContext';
// import logo from '../assets/logo-ayamkabogor.png';
// ------------------------------------------------------------------


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // ✅ Check login status dari localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // ✅ Ambil total items dari CartContext
    const { getTotalItems, clearCart } = useCart();
    const totalItems = getTotalItems();

    const isAdminPage = location.pathname.startsWith('/admin');

    // ✅ Check login status saat component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token) {
            setIsLoggedIn(true);

            // Ambil nama user dari localStorage
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    setUserName(userData.name || 'Pelanggan');
                } catch (error) {
                    setUserName('Pelanggan');
                }
            } else {
                setUserName('Pelanggan');
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    // ✅ FUNGSI LOGOUT YANG BENAR
    const handleLogout = () => {
        // Konfirmasi sebelum logout
        if (window.confirm('Yakin ingin keluar dari akun?')) {
            // 1. Hapus token
            localStorage.removeItem('token');

            // 2. Hapus user data
            localStorage.removeItem('user');

            // 3. Clear cart (optional - tergantung UX yang diinginkan)
            // clearCart(); // Uncomment jika ingin hapus keranjang saat logout

            // 4. Update state
            setIsLoggedIn(false);
            setUserName('');

            // 5. Close dropdown
            setIsProfileOpen(false);

            // 6. Redirect ke login
            navigate('/login');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">

            {/* OVERLAY */}
            {(isOpen || isProfileOpen) && (
                <div
                    className="fixed inset-0 w-full h-full bg-black/10 backdrop-blur-[1px] z-0"
                    onClick={() => { setIsOpen(false); setIsProfileOpen(false); }}
                />
            )}

            {!isAdminPage && (
                <nav className="container mx-auto relative p-2 h-14 flex items-center justify-end">

                    {/* BAR ORANYE TENGAH */}
                    <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl px-2 justify-center rounded top-1/2 -translate-y-1/2 bg-gradient-to-b from-orange-600 to-orange-400 text-white font-bold shadow-lg absolute left-1/2 -translate-x-1/2 z-20">
                        <div className="flex items-center justify-between">

                            {/* Tombol Menu */}
                            <button
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-black/10 transition-all"
                                aria-label="Toggle Menu"
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                                <span className="text-xs tracking-wider uppercase">Menu</span>
                            </button>

                            {/* Logo */}
                            <div>
                                <a href="/">
                                    <img src={logo} alt="Logo Ayam Kabogor" className="h-10 object-contain" />
                                </a>
                            </div>

                            {/* Area Kanan */}
                            <div className="flex items-center gap-2">

                                {/* ✅ ICON KERANJANG (TOP BAR) - HILANG JIKA BELUM LOGIN */}
                                {isLoggedIn && (
                                    <a
                                        href="/keranjang"
                                        className="relative p-1 rounded-full hover:bg-black/10 transition-all"
                                        aria-label="Keranjang Belanja"
                                    >
                                        <ShoppingCart size={24} />

                                        {/* Badge Notifikasi */}
                                        {totalItems > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                                                {totalItems > 99 ? '99+' : totalItems}
                                            </span>
                                        )}
                                    </a>
                                )}

                                {/* Ikon WA */}
                                <a
                                    href="https://wa.me/628123456789"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded-full hover:bg-black/10 transition-all"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle size={26} />
                                </a>

                                {/* Fitur Profile */}
                                {isLoggedIn ? (
                                    <div className="relative">
                                        <button
                                            onClick={toggleProfile}
                                            className="flex items-center justify-center p-1 rounded-full hover:bg-black/10 transition-all focus:outline-none"
                                        >
                                            <User size={24} className="text-yellow-200" />
                                        </button>

                                        {/* Dropdown Menu Profile */}
                                        {isProfileOpen && (
                                            <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl text-gray-800 py-2 border border-orange-100 animate-in fade-in slide-in-from-top-2 z-50">

                                                {/* User Info */}
                                                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                                    <p className="text-xs text-gray-400">Halo,</p>
                                                    <p className="font-bold text-orange-600 truncate">{userName}</p>
                                                </div>

                                                {/* Menu Items */}
                                                <a
                                                    href="/profile"
                                                    className="flex items-center px-4 py-2 hover:bg-orange-50 text-sm gap-3 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <User className="text-gray-400" size={14} />
                                                    Profile Saya
                                                </a>

                                                <a
                                                    href="/riwayat-pesanan"
                                                    className="flex items-center px-4 py-2 hover:bg-orange-50 text-sm gap-3 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <History className="text-gray-400" size={14} />
                                                    Riwayat Order
                                                </a>

                                                <div className="border-t border-gray-100 my-1"></div>

                                                {/* Tombol Logout */}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center px-4 py-2 hover:bg-red-50 text-red-600 text-sm gap-3 text-left transition-colors"
                                                >
                                                    <LogOut size={14} />
                                                    Keluar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href="/login"
                                        className="text-[10px] sm:text-xs bg-white text-orange-600 px-3 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm"
                                    >
                                        LOGIN
                                    </a>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* TOMBOL PESAN (DESKTOP) */}
                    <div className='container mx-auto flex justify-end items-center h-14'>
                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:inline-block bg-gradient-to-b from-orange-600 to-orange-800 hover:from-orange-700 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-full shadow-md transition-all"
                        >
                            Pesan Sekarang!
                        </a>
                    </div>

                </nav>
            )}

            {/* MENU DROPDOWN (BAGIAN KE BAWAH) */}
            <div
                className={`
                    absolute w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 xl:max-w-lg 2xl:max-w-2xl max-w-6xl left-1/2 -translate-x-1/2 bg-gradient-to-b from-orange-400 to-orange-500 shadow-lg 
                    text-white font-bold p-6 transition-all duration-300 ease-in-out rounded
                    ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
                `}
            >
                <ul className="flex flex-col items-center text-center space-y-4 tracking-wider">
                    <li><a href="/" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">01 HOME</a></li>
                    <li><a href="/about" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">02 ABOUT US</a></li>
                    <li><a href="/menu-lengkap" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">03 PRICELIST & MENU</a></li>
                    <li><a href="/ulasan" onClick={toggleMenu} className="block py-3 px-6 border-b border-white/30 w-60 hover:bg-black/10 rounded-md">04 ULASAN</a></li>
                    {/* Item Keranjang dihapus dari sini */}
                    <li><a href="/FAQ" onClick={toggleMenu} className="block py-3 px-6 w-60 hover:bg-black/10 rounded-md">05 FAQ</a></li>
                </ul>

                {/* TOMBOL PESAN (MOBILE) */}
                {!isAdminPage && (
                    <a
                        href="https://wa.me/628123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full max-w-xs mx-auto text-center mt-8 py-3 bg-orange-700 hover:bg-orange-800 rounded-lg tracking-wider transition-all"
                    >
                        ORDER NOW!
                    </a>
                )}
            </div>

        </header>
    );
}

export default Navbar;