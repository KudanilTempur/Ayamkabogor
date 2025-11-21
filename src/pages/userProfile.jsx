import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Camera, Save, CheckCircle, AlertTriangle, LogOut } from 'lucide-react';

// --- KONFIGURASI API ---
const BASE_API_URL = "http://127.0.0.1:8000/api";

const UserProfileSecure = () => {
    // State untuk Data Profil
    const [userData, setUserData] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: null,
        member_since: null
    });

    // State UI & Status
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: 'success', text: '' });
    const [errorMessage, setErrorMessage] = useState(null);

    // State untuk upload avatar
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Form validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // ✅ 1. CHECK AUTHENTICATION
    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Jika tidak ada token, redirect ke login
            alert('Sesi berakhir. Silakan login kembali.');
            window.location.href = '/login';
            return false;
        }
        return token;
    };

    // ✅ 2. FETCH USER PROFILE (Secure)
    const fetchUserProfile = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const token = checkAuth();
            if (!token) return;

            const response = await fetch(`${BASE_API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
            });

            // Handle berbagai status code
            if (response.status === 401) {
                // Token expired atau invalid
                localStorage.removeItem('token');
                alert('Sesi berakhir. Silakan login kembali.');
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error(`Gagal memuat profil (${response.status})`);
            }

            const result = await response.json();
            const data = result.data || result;

            setUserData({
                id: data.id,
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
                avatar: data.profile_photo || data.avatar || null,
                member_since: data.member_since || data.created_at
            });

        } catch (error) {
            console.error("Fetch profile error:", error);
            setErrorMessage(error.message);
            showNotification('error', `Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Load profile saat component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // ✅ 3. VALIDATE FORM
    const validateForm = () => {
        const errors = {};

        // Validasi Nama
        if (!userData.name || userData.name.trim().length < 3) {
            errors.name = 'Nama minimal 3 karakter';
        }

        // Validasi Phone
        if (userData.phone && !/^[0-9]{10,13}$/.test(userData.phone.replace(/[-\s]/g, ''))) {
            errors.phone = 'Format nomor telepon tidak valid';
        }

        // Validasi Address
        if (userData.address && userData.address.length > 200) {
            errors.address = 'Alamat maksimal 200 karakter';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ✅ 4. SAVE PROFILE (Secure)
    const handleSave = async () => {
        // Validasi form dulu
        if (!validateForm()) {
            showNotification('error', 'Mohon perbaiki input yang salah');
            return;
        }

        setIsSaving(true);
        setErrorMessage(null);

        try {
            const token = checkAuth();
            if (!token) return;

            const response = await fetch(`${BASE_API_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: userData.name.trim(),
                    phone: userData.phone.trim(),
                    address: userData.address.trim()
                }),
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                alert('Sesi berakhir. Silakan login kembali.');
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menyimpan profil');
            }

            const result = await response.json();

            setIsEditing(false);
            showNotification('success', '✅ Profil berhasil diperbarui!');

            // Update local data dengan response dari server
            if (result.data) {
                setUserData(prev => ({
                    ...prev,
                    ...result.data
                }));
            }

        } catch (error) {
            console.error("Save profile error:", error);
            showNotification('error', `Gagal menyimpan: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    // ✅ 5. UPLOAD AVATAR (Secure)
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi file
        if (file.size > 2 * 1024 * 1024) {
            showNotification('error', 'Ukuran foto maksimal 2MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            showNotification('error', 'File harus berupa gambar');
            return;
        }

        setAvatarFile(file);

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadAvatar = async () => {
        if (!avatarFile) return;

        setIsSaving(true);

        try {
            const token = checkAuth();
            if (!token) return;

            const formData = new FormData();
            formData.append('photo', avatarFile);

            const response = await fetch(`${BASE_API_URL}/profile/photo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                alert('Sesi berakhir. Silakan login kembali.');
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error('Gagal mengupload foto');
            }

            const result = await response.json();

            setUserData(prev => ({
                ...prev,
                avatar: result.photo_url || result.data?.profile_photo
            }));

            setAvatarFile(null);
            setAvatarPreview(null);
            showNotification('success', '✅ Foto profil berhasil diperbarui!');

        } catch (error) {
            console.error("Upload avatar error:", error);
            showNotification('error', `Gagal upload: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    // ✅ 6. LOGOUT (Secure)
    const handleLogout = () => {
        if (window.confirm('Yakin ingin keluar?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            window.location.href = '/login';
        }
    };

    // Handler untuk input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));

        // Clear validation error untuk field ini
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Helper untuk notifikasi
    const showNotification = (type, text) => {
        setToastMessage({ type, text });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };

    // Format tanggal
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-10 px-4 font-sans relative">

            {/* Toast Notifikasi */}
            {showToast && (
                <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-300 ${toastMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    } text-white animate-slidein`}>
                    {toastMessage.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                    <p className="font-semibold text-sm md:text-base">{toastMessage.text}</p>
                </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-700"></div>
                        <p className="mt-4 text-orange-700 font-medium">Memuat profil...</p>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">

                {/* Header / Cover */}
                <div className="relative h-48 bg-gradient-to-r from-orange-600 to-orange-400 rounded-t-2xl shadow-lg">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative group">
                            <img
                                src={avatarPreview || userData.avatar || "https://placehold.co/150x150/E5964D/white?text=User"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/150x150/E5964D/white?text=User";
                                }}
                            />

                            {/* Tombol Upload Foto */}
                            <label className="absolute bottom-0 right-0 bg-orange-700 text-white p-2 rounded-full hover:bg-orange-800 transition-colors shadow-md cursor-pointer">
                                <Camera size={16} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Tombol Simpan Avatar Baru */}
                        {avatarFile && (
                            <button
                                onClick={handleUploadAvatar}
                                disabled={isSaving}
                                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded-full shadow-md transition disabled:opacity-50"
                            >
                                {isSaving ? 'Uploading...' : 'Upload Foto'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Konten Profil */}
                <div className="bg-white rounded-b-2xl shadow-lg pt-20 pb-8 px-6 md:px-12 mt-0 border-x border-b border-orange-100">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">{userData.name || 'Nama Belum Diisi'}</h1>
                        <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            Bergabung sejak {formatDate(userData.member_since)}
                        </p>
                    </div>

                    {/* Form Data */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap justify-between items-center border-b-2 border-orange-100 pb-3 mb-4">
                            <h3 className="text-xl font-bold text-orange-800">Informasi Pribadi</h3>
                            <button
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                    if (isEditing) {
                                        // Reset form jika cancel
                                        fetchUserProfile();
                                        setValidationErrors({});
                                    }
                                }}
                                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 font-semibold p-1 transition-colors"
                            >
                                <Edit2 size={16} />
                                {isEditing ? 'Batal Edit' : 'Edit Profil'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nama Lengkap */}
                            <ProfileField
                                label="Nama Lengkap"
                                icon={User}
                                name="name"
                                value={userData.name}
                                isEditing={isEditing}
                                handleChange={handleChange}
                                type="text"
                                error={validationErrors.name}
                            />

                            {/* Email (Read Only) */}
                            <ProfileField
                                label="Email"
                                icon={Mail}
                                name="email"
                                value={userData.email}
                                isEditing={false}
                                readOnly={true}
                                info="Email tidak dapat diubah"
                            />

                            {/* No Telepon */}
                            <ProfileField
                                label="No. WhatsApp"
                                icon={Phone}
                                name="phone"
                                value={userData.phone}
                                isEditing={isEditing}
                                handleChange={handleChange}
                                type="text"
                                error={validationErrors.phone}
                            />

                            {/* Alamat */}
                            <ProfileField
                                label="Alamat Pengiriman"
                                icon={MapPin}
                                name="address"
                                value={userData.address}
                                isEditing={isEditing}
                                handleChange={handleChange}
                                type="textarea"
                                fullWidth={true}
                                error={validationErrors.address}
                            />
                        </div>

                        {/* Tombol Simpan & Logout */}
                        <div className="flex flex-col md:flex-row gap-3 mt-8">
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {isSaving ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut size={20} />
                                KELUAR
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Sub-Komponen ProfileField
const ProfileField = ({
    label,
    icon: Icon,
    name,
    value,
    isEditing,
    handleChange,
    type = 'text',
    readOnly = false,
    info = null,
    fullWidth = false,
    error = null
}) => (
    <div className={`bg-orange-50/50 p-4 rounded-xl border ${error ? 'border-red-400' : 'border-orange-100'} ${fullWidth ? 'md:col-span-2' : ''}`}>
        <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Icon size={16} className="text-orange-500" /> {label}
        </label>
        {isEditing && !readOnly ? (
            <>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-gray-800 ${error ? 'border-red-400' : ''}`}
                        rows="2"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-gray-800 ${error ? 'border-red-400' : ''}`}
                    />
                )}
                {error && <p className="text-xs text-red-500 mt-1">⚠️ {error}</p>}
            </>
        ) : (
            <>
                <p className="font-semibold text-gray-800 text-lg break-words">{value || '-'}</p>
                {info && <p className="text-xs text-gray-400 mt-1">{info}</p>}
            </>
        )}
    </div>
);

export default UserProfileSecure;