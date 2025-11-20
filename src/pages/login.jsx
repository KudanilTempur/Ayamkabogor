// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// =================================================================
// BAGIAN 1: UNTUK PREVIEW DI SINI (HAPUS BAGIAN INI DI LAPTOP)
// =================================================================
// Kita gunakan gambar placeholder agar tidak error di preview
const loginImage = "https://placehold.co/600x800/2d3748/white?text=Foto+Nasi+Tumpeng";
// =================================================================


// =================================================================
// BAGIAN 2: UNTUK LAPTOP ANDA (NYALAKAN/UNCOMMENT BAGIAN INI)
// =================================================================
// Hapus tanda slash (//) di depan baris import ini saat di laptop:
// import loginImage from '../assets/nasi-tumpeng.png'; 
// =================================================================


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Logika login sederhana (di dunia nyata akan panggil API)
        if (username === 'user' && password === 'password') {
            alert('Login Berhasil!');
            navigate('/'); // Arahkan ke halaman utama setelah login
        } else {
            alert('Username atau Password salah!');
        }
    };

    return (
        <div className="flex h-screen bg-orange-50 font-sans">
            {/* Bagian Kiri (Gambar Nasi Tumpeng) */}
            {/* hidden md:flex artinya: sembunyi di HP, muncul di layar sedang/besar */}
            <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Overlay gelap agar elegan */}
                <img
                    src={loginImage}
                    alt="Nasi Tumpeng"
                    className="object-cover w-full h-full"
                />
                <div className="absolute z-20 text-white text-center px-10">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Ayam Kabogor</h1>
                    <p className="text-xl font-light">Nikmati Kelezatan Autentik Khas Bogor</p>
                </div>
            </div>

            {/* Bagian Kanan (Form Login) */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white md:bg-transparent">
                <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-orange-100">
                    <h2 className="text-4xl font-black text-orange-800 mb-2 italic tracking-wider">
                        LOGIN
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm">Silakan masuk untuk melanjutkan</p>

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50"
                                placeholder="Masukkan username Anda"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50"
                                placeholder="Masukkan password Anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            MASUK SEKARANG
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
                        <p>
                            Belum punya akun?{' '}
                            <a href="/register" className="font-bold text-orange-600 hover:text-orange-800 hover:underline transition-all">
                                Daftar Disini
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;