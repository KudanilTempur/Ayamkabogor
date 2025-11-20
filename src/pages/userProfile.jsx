import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Camera, Save, CheckCircle, AlertTriangle } from 'lucide-react';

// --- KONFIGURASI API ---
// Ganti ini dengan URL base API Laravel teman Anda
const BASE_API_URL = "http://localhost:8000/api";

// Asumsi: Token Auth disimpan di localStorage setelah login
const DUMMY_AUTH_TOKEN = "your_auth_token_from_laravel_login_12345";

const UserProfileAPI = () => {
    // State untuk Data Profil
    const [userData, setUserData] = useState({
        name: "Pelanggan Setia",
        email: "pelanggan@example.com",
        phone: "0812-3456-7890",
        address: "Jl. Raya Bogor KM 42, Cibinong, Jawa Barat",
        avatar: "https://placehold.co/150x150/E5964D/white?text=User"
    });

    // State UI & Status
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Untuk pesan error

    // 1. Fungsi untuk Mengambil Data Profil dari API Laravel
    const fetchUserProfile = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Kita ambil token dari localStorage (sesuai alur kerja React + Laravel)
            const token = DUMMY_AUTH_TOKEN;
            if (!token) {
                throw new Error("Token autentikasi tidak ditemukan. Harap login.");
            }

            const response = await fetch(`${BASE_API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // WAJIB: Sertakan token untuk otorisasi di sisi Laravel
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                // Laravel akan mengembalikan status 401 jika token tidak valid
                throw new Error(`Gagal memuat data profil. Status: ${response.status}`);
            }

            const data = await response.json();

            // Menggunakan data yang diterima dari API
            setUserData(prev => ({
                ...prev,
                name: data.name || prev.name,
                email: data.email || prev.email,
                phone: data.phone || prev.phone,
                address: data.address || prev.address,
            }));

        } catch (error) {
            console.error("Fetch profile error:", error);
            setErrorMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Panggil fungsi fetch saat komponen dimuat
    useEffect(() => {
        fetchUserProfile();
    }, []);


    // 2. Fungsi untuk Menyimpan Perubahan ke API Laravel
    const handleSave = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const token = DUMMY_AUTH_TOKEN;
            if (!token) {
                throw new Error("Token autentikasi tidak ditemukan.");
            }

            // Kirim request PUT/PATCH ke endpoint API
            const response = await fetch(`${BASE_API_URL}/profile`, {
                method: 'PUT', // Atau 'PATCH' tergantung implementasi teman Anda
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Kirim data yang diubah dalam format JSON
                body: JSON.stringify({
                    name: userData.name,
                    phone: userData.phone,
                    address: userData.address
                    // Catatan: Email biasanya tidak diizinkan diubah dari endpoint ini
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Gagal menyimpan data. Status: ${response.status}`);
            }

            // Jika sukses:
            setIsEditing(false);
            setShowToast(true); // Tampilkan notifikasi sukses
            setTimeout(() => setShowToast(false), 3000);

        } catch (error) {
            console.error("Save profile error:", error);
            setErrorMessage(`Gagal menyimpan: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler untuk perubahan input
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-10 px-4 font-sans relative">

            {/* Toast Notifikasi Sukses */}
            {showToast && (
                <div className="fixed top-5 right-5 z-50 p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center gap-3 transition-opacity duration-300 animate-slidein">
                    <CheckCircle size={24} />
                    <p className="font-semibold text-sm md:text-base">Data profil berhasil disimpan via API!</p>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="fixed top-5 right-5 z-50 p-4 bg-red-600 text-white rounded-lg shadow-xl flex items-center gap-3 transition-opacity duration-300 animate-slidein">
                    <AlertTriangle size={24} />
                    <p className="font-semibold text-sm md:text-base">{errorMessage}</p>
                </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-700"></div>
                        <p className="mt-4 text-orange-700 font-medium">Memuat data dari API...</p>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">

                {/* Header / Cover Kecil (Sama seperti sebelumnya) */}
                <div className="relative h-48 bg-gradient-to-r from-orange-600 to-orange-400 rounded-t-2xl shadow-lg">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative group">
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                            />
                            {/* Tombol Ganti Foto (Placeholder) */}
                            <button className="absolute bottom-0 right-0 bg-orange-700 text-white p-2 rounded-full hover:bg-orange-800 transition-colors shadow-md">
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Konten Profil (Sama seperti sebelumnya) */}
                <div className="bg-white rounded-b-2xl shadow-lg pt-20 pb-8 px-6 md:px-12 mt-0 border-x border-b border-orange-100">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                        <p className="text-gray-500 text-sm">Frontend by React, Backend by Laravel</p>
                        {/* ID Pengguna, diganti dengan ID sesi token/pengguna API */}
                        <p className="text-xs text-orange-400 mt-1 truncate max-w-full overflow-hidden">
                            Token: {DUMMY_AUTH_TOKEN}
                        </p>
                    </div>

                    {/* Form / Tampilan Data (Sama seperti sebelumnya) */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap justify-between items-center border-b-2 border-orange-100 pb-3 mb-4">
                            <h3 className="text-xl font-bold text-orange-800">Informasi Pribadi</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 font-semibold p-1 transition-colors"
                            >
                                <Edit2 size={16} />
                                {isEditing ? 'Batal Edit' : 'Edit Profil'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nama Lengkap */}
                            <ProfileField
                                label="Nama Lengkap" icon={User} name="name"
                                value={userData.name} isEditing={isEditing}
                                handleChange={handleChange}
                                type="text"
                            />

                            {/* Email (Hanya Baca) */}
                            <ProfileField
                                label="Email" icon={Mail} name="email"
                                value={userData.email} isEditing={false}
                                handleChange={handleChange}
                                readOnly={true}
                                info="Email tidak dapat diubah (API Read-Only)"
                            />

                            {/* No Telepon */}
                            <ProfileField
                                label="No. WhatsApp" icon={Phone} name="phone"
                                value={userData.phone} isEditing={isEditing}
                                handleChange={handleChange}
                                type="text"
                            />

                            {/* Alamat (Menggunakan textarea) */}
                            <ProfileField
                                label="Alamat Pengiriman" icon={MapPin} name="address"
                                value={userData.address} isEditing={isEditing}
                                handleChange={handleChange}
                                type="textarea"
                                fullWidth={true}
                            />
                        </div>

                        {/* Tombol Simpan (Hanya muncul saat Edit) */}
                        {isEditing && (
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={handleSave} // Memanggil fungsi save ke API
                                    disabled={isLoading}
                                    className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Save size={20} />
                                    {isLoading ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

// Sub-Komponen ProfileField tetap sama, tidak ada perubahan
const ProfileField = ({ label, icon: Icon, name, value, isEditing, handleChange, type = 'text', readOnly = false, info = null, fullWidth = false }) => (
    <div className={`bg-orange-50/50 p-4 rounded-xl border border-orange-100 ${fullWidth ? 'md:col-span-2' : ''}`}>
        <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Icon size={16} className="text-orange-500" /> {label}
        </label>
        {isEditing && !readOnly ? (
            type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value} onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-gray-800"
                    rows="2"
                />
            ) : (
                <input
                    type={type} name={name}
                    value={value} onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-gray-800"
                />
            )
        ) : (
            <>
                <p className="font-semibold text-gray-800 text-lg break-words">{value}</p>
                {info && <p className="text-xs text-gray-400 mt-1">{info}</p>}
            </>
        )}
    </div>
);

export default UserProfileAPI;