import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Loader, UserCheck, ShieldAlert } from 'lucide-react'; // Tambah icon ShieldAlert
import axios from 'axios';

// API Configuration
const API_BASE_URL = "http://127.0.0.1:8000/api";
const LOGIN_URL = `${API_BASE_URL}/login`;

// Placeholder image
const loginImage = "https://placehold.co/600x800/2d3748/white?text=Foto+Nasi+Tumpeng";

// --- 🔑 1. AKUN DUMMY USER ---
const DUMMY_ACCOUNT = {
    email: "demo@ayamkabogor.com",
    password: "password123",
    name: "Demo User"
};

// --- 🛡️ 2. AKUN DUMMY ADMIN (BARU) ---
const ADMIN_ACCOUNT = {
    email: "admin@ayamkabogor.com",
    password: "admin",
    name: "Super Admin"
};

function LoginPage() {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // UI State
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    // Fitur Cepat: Isi Form dengan Akun Demo User
    const fillDemoAccount = () => {
        setFormData({
            email: DUMMY_ACCOUNT.email,
            password: DUMMY_ACCOUNT.password
        });
        setError('');
    };

    // Fitur Cepat: Isi Form dengan Akun Admin (BARU)
    const fillAdminAccount = () => {
        setFormData({
            email: ADMIN_ACCOUNT.email,
            password: ADMIN_ACCOUNT.password
        });
        setError('');
    };

    // Handle Login Submit
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validasi client-side
        if (!formData.email || !formData.password) {
            setError('Email dan password harus diisi');
            setIsLoading(false);
            return;
        }

        // ---------------------------------------------------------
        // 🚀 3. MOCK LOGIN CHECK (ADMIN CHECK)
        // ---------------------------------------------------------
        if (formData.email === ADMIN_ACCOUNT.email && formData.password === ADMIN_ACCOUNT.password) {
            console.log("🔥 Login sebagai ADMIN (Bypass)");

            setTimeout(() => {
                localStorage.setItem('token', 'admin-dummy-token-999');
                localStorage.setItem('user', JSON.stringify({
                    id: 1,
                    name: ADMIN_ACCOUNT.name,
                    email: ADMIN_ACCOUNT.email,
                    role: 'admin' // <--- KUNCI UNTUK MASUK DASHBOARD
                }));

                setIsLoading(false);
                navigate('/admin-dashboard'); // Langsung ke Dashboard
                window.location.reload();
            }, 1000);
            return;
        }

        // ---------------------------------------------------------
        // 🚀 4. MOCK LOGIN CHECK (USER CHECK)
        // ---------------------------------------------------------
        if (formData.email === DUMMY_ACCOUNT.email && formData.password === DUMMY_ACCOUNT.password) {
            console.log("🔥 Login sebagai USER (Bypass)");

            setTimeout(() => {
                localStorage.setItem('token', 'dummy-token-12345xyz');
                localStorage.setItem('user', JSON.stringify({
                    id: 999,
                    name: DUMMY_ACCOUNT.name,
                    email: DUMMY_ACCOUNT.email,
                    role: 'user' // <--- Role User Biasa
                }));

                setIsLoading(false);
                navigate('/'); // Ke Halaman Utama
                window.location.reload();
            }, 1000);
            return;
        }

        // --- JIKA BUKAN DUMMY, LANJUT KE API ---
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Format email tidak valid');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(LOGIN_URL, {
                email: formData.email,
                password: formData.password
            }, {
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const data = response.data.data || response.data;

            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                if (rememberMe) {
                    localStorage.setItem('remembered_email', formData.email);
                } else {
                    localStorage.removeItem('remembered_email');
                }

                // Redirect dinamis berdasarkan role dari API (jika ada)
                if (data.user?.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
                window.location.reload();

            } else {
                setError('Login gagal. Token tidak ditemukan.');
            }

        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || error.response.data?.error;
                if (status === 401) setError('Email atau password salah');
                else if (status === 422) setError(message || 'Data tidak valid');
                else setError(message || 'Terjadi kesalahan saat login');
            } else if (error.request) {
                setError('Tidak dapat terhubung ke server.');
            } else {
                setError('Terjadi kesalahan: ' + error.message);
            }
        } finally {
            // Pastikan loading mati jika bukan flow dummy yang sedang berjalan
            const isDummyUser = formData.email === DUMMY_ACCOUNT.email && formData.password === DUMMY_ACCOUNT.password;
            const isAdminUser = formData.email === ADMIN_ACCOUNT.email && formData.password === ADMIN_ACCOUNT.password;

            if (!isDummyUser && !isAdminUser) {
                setIsLoading(false);
            }
        }
    };

    // Load remembered email
    React.useEffect(() => {
        const rememberedEmail = localStorage.getItem('remembered_email');
        if (rememberedEmail) {
            setFormData(prev => ({ ...prev, email: rememberedEmail }));
            setRememberMe(true);
        }
        const token = localStorage.getItem('token');
        if (token) {
            // Opsional: Cek role user yang tersimpan untuk redirect yang tepat
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role === 'admin') navigate('/admin-dashboard');
            else navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex h-screen bg-orange-50 font-sans">
            {/* Bagian Kiri (Gambar) */}
            <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img src={loginImage} alt="Ayam Kabogor" className="object-cover w-full h-full" />
                <div className="absolute z-20 text-white text-center px-10">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Ayam Kabogor</h1>
                    <p className="text-xl font-light">Nikmati Kelezatan Autentik Khas Bogor</p>
                </div>
            </div>

            {/* Bagian Kanan (Form Login) */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white md:bg-transparent">
                <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-orange-100">

                    <h2 className="text-4xl font-black text-orange-800 mb-2 italic tracking-wider">LOGIN</h2>
                    <p className="text-gray-500 mb-8 text-sm">Silakan masuk untuk melanjutkan</p>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-left animate-shake">
                            <p className="font-semibold">⚠️ {error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                                placeholder="contoh@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span className="text-gray-600">Ingat saya</span>
                            </label>
                            <a href="/forgot-password" className="text-orange-600 hover:underline">Lupa password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <><Loader size={20} className="animate-spin" /> Memproses...</>
                            ) : (
                                <><LogIn size={20} /> MASUK SEKARANG</>
                            )}
                        </button>
                    </form>

                    {/* 5. TOMBOL RAHASIA (DIPERBARUI) */}
                    <div className="mt-6 pt-4 border-t border-dashed border-gray-300 space-y-3">
                        <p className="text-xs text-gray-400 font-semibold">DEVELOPMENT MODE</p>

                        {/* Tombol User Biasa */}
                        <button
                            onClick={fillDemoAccount}
                            type="button"
                            className="w-full py-2 px-4 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <UserCheck size={16} />
                            Akun Demo User
                        </button>

                        {/* Tombol Admin (BARU) */}
                        <button
                            onClick={fillAdminAccount}
                            type="button"
                            className="w-full py-2 px-4 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShieldAlert size={16} />
                            Akun Demo Admin
                        </button>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>Belum punya akun? <a href="/register" className="font-bold text-orange-600 hover:underline">Daftar Disini</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;