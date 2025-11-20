import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LayoutDashboard,
    ShoppingBag,
    Utensils,
    Users,
    LogOut,
    Menu as MenuIcon,
    DollarSign,
    Plus,
    Edit,
    Trash2,
    Search,
    X,
    Save,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-react';

// Ganti URL ini sesuai alamat backend kamu
const API_BASE_URL = "http://127.0.0.1:8000/api/products";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [activeTab, setActiveTab] = useState('dashboard'); // Default dashboard

    // State Data & UI
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // State Form
    const [currentMenu, setCurrentMenu] = useState({
        id: null,
        product_name: '',
        product_price: '',
        product_description: '',
        product_url_image: null
    });
    const [imageFile, setImageFile] = useState(null);

    // --- 0. KONFIGURASI AXIOS (PENTING UNTUK LARAVEL) ---
    useEffect(() => {
        // 1. Set Header agar Laravel tahu kita minta JSON
        axios.defaults.headers.common['Accept'] = 'application/json';

        // 2. Ambil token dari LocalStorage
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // --- 1. FETCH DATA (READ) ---
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_BASE_URL);
            const data = response.data.data ? response.data.data : response.data;
            setMenus(data);
        } catch (error) {
            console.error("Fetch Error:", error);
            if (error.response && error.response.status === 401) {
                alert("Sesi habis, silakan login kembali.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        const handleResize = () => window.innerWidth < 768 ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- LOGIC CRUD ---

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setImageFile(null);
        setCurrentMenu({
            id: null,
            product_name: '',
            product_price: '',
            product_description: '',
            product_url_image: null
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (menu) => {
        setIsEditing(true);
        setImageFile(null);
        setCurrentMenu({
            id: menu.id,
            product_name: menu.product_name,
            product_price: menu.product_price,
            product_description: menu.product_description,
            product_url_image: menu.product_url_image
        });
        setIsModalOpen(true);
    };

    // --- 2. SAVE DATA (CREATE & UPDATE - LARAVEL SAFE) ---
    const handleSaveMenu = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_name', currentMenu.product_name);
        formData.append('product_price', currentMenu.product_price);
        formData.append('product_description', currentMenu.product_description);

        if (imageFile) {
            formData.append('product_img', imageFile);
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (isEditing) {
                // TRICK LARAVEL: Pakai _method: 'PUT'
                formData.append('_method', 'PUT');
                await axios.post(`${API_BASE_URL}/${currentMenu.id}`, formData, config);
                alert("Produk berhasil diperbarui!");
            } else {
                await axios.post(API_BASE_URL, formData, config);
                alert("Produk berhasil ditambahkan!");
            }

            fetchProducts();
            setIsModalOpen(false);

        } catch (error) {
            // ERROR HANDLING LARAVEL VALIDATION (422)
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                let errorMessages = [];
                Object.keys(errors).forEach((key) => {
                    errorMessages.push(errors[key][0]);
                });
                alert("Validasi Gagal:\n- " + errorMessages.join("\n- "));
            } else {
                console.error("Save Error:", error);
                alert("Terjadi kesalahan server.");
            }
        }
    };

    // --- 3. DELETE DATA ---
    const handleDeleteMenu = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`);
                alert("Produk berhasil dihapus");
                fetchProducts();
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Gagal menghapus data.");
            }
        }
    };

    const handleLogout = () => {
        if (window.confirm("Keluar dari aplikasi?")) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    // --- VIEWS LENGKAP ---

    const DashboardView = () => {
        // Data Mockup untuk Dashboard (Supaya tampilan cantik seperti screenshot)
        const stats = [
            { title: "Total Penjualan", value: "Rp 15.450.000", icon: <DollarSign />, color: "bg-green-500" },
            { title: "Pesanan Masuk", value: "145", icon: <ShoppingBag />, color: "bg-blue-500" },
            // Kita pakai data real 'menus.length' di sini biar dinamis
            { title: "Total Menu", value: menus.length, icon: <Utensils />, color: "bg-orange-500" },
            { title: "Pelanggan", value: "1,204", icon: <Users />, color: "bg-purple-500" },
        ];

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-gray-800">Ringkasan Bisnis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center hover:shadow-lg transition-shadow">
                            <div className={`p-3 rounded-xl text-white mr-4 ${stat.color}`}>{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Placeholder Grafik */}
                <div className="bg-white p-6 rounded-xl shadow-md h-96 border border-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">Area Grafik Penjualan (Chart)</p>
                </div>
            </div>
        );
    };

    const MenuManagerView = () => {
        const filteredMenus = menus.filter(item =>
            item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Produk ({menus.length})</h2>
                    <button
                        onClick={handleOpenAddModal}
                        className="bg-orange-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition shadow-lg shadow-orange-300/50"
                    >
                        <Plus size={18} /> Tambah Produk
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative flex-1 max-w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 min-w-[700px]">
                            <thead className="bg-gray-50 text-gray-800 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 w-20">Gambar</th>
                                    <th className="px-6 py-3">Nama Produk</th>
                                    <th className="px-6 py-3 w-1/3">Deskripsi</th>
                                    <th className="px-6 py-3">Harga</th>
                                    <th className="px-6 py-3 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="text-center py-4">Loading data...</td></tr>
                                ) : filteredMenus.length > 0 ? (
                                    filteredMenus.map((item) => (
                                        <tr key={item.id} className="hover:bg-orange-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                {item.product_url_image ? (
                                                    <img
                                                        src={item.product_url_image}
                                                        alt={item.product_name}
                                                        className="w-12 h-12 rounded object-cover shadow-sm bg-white border"
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Err'; }}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.product_name}</td>
                                            <td className="px-6 py-4">
                                                <p className="truncate max-w-xs" title={item.product_description}>
                                                    {item.product_description}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                Rp {parseInt(item.product_price || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center gap-3">
                                                <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteMenu(item.id)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
                                            <AlertCircle size={32} className="mx-auto mb-2" />
                                            Tidak ada produk ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            <aside className={`bg-gray-900 text-white flex flex-col z-30 shadow-xl fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto ${isSidebarOpen ? 'w-64' : 'w-64 md:w-20'}`}>
                <div className="h-16 flex items-center justify-center border-b border-gray-800 bg-gray-900">
                    <h1 className={`font-bold text-xl text-orange-500 tracking-wider ${!isSidebarOpen && 'md:hidden'}`}>ADMIN CMS</h1>
                    <span className={`font-bold text-xl text-orange-500 hidden ${!isSidebarOpen && 'md:block'}`}>CMS</span>
                </div>
                <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
                    {/* Menu Dashboard */}
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeTab === 'dashboard'} isOpen={isSidebarOpen} onClick={() => setActiveTab('dashboard')} />

                    {/* Menu Produk */}
                    <SidebarItem icon={<Utensils size={20} />} text="Kelola Produk" active={activeTab === 'menu'} isOpen={isSidebarOpen} onClick={() => setActiveTab('menu')} />

                    {/* Menu Tambahan (Mockup) */}
                    <SidebarItem icon={<ShoppingBag size={20} />} text="Pesanan" active={activeTab === 'orders'} isOpen={isSidebarOpen} badge="3" onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={<Users size={20} />} text="Pelanggan" active={activeTab === 'customers'} isOpen={isSidebarOpen} onClick={() => setActiveTab('customers')} />
                </nav>
                <div className="p-3 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-3 py-2 rounded hover:bg-gray-800 text-red-400 transition-colors">
                        <LogOut size={20} />
                        <span className={`ml-3 font-medium ${!isSidebarOpen && 'md:hidden'}`}>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 z-10 flex-shrink-0">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 p-2 rounded-md hover:bg-gray-100">
                        <MenuIcon size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600 hidden sm:block">Halo, Admin</span>
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'menu' && <MenuManagerView />}
                    {activeTab === 'orders' && <div className="p-6 bg-white rounded-xl text-center text-gray-500">Halaman Pesanan (Belum Terkoneksi)</div>}
                    {activeTab === 'customers' && <div className="p-6 bg-white rounded-xl text-center text-gray-500">Halaman Pelanggan (Belum Terkoneksi)</div>}
                </main>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-lg text-gray-800">
                                    {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSaveMenu} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={currentMenu.product_name}
                                        onChange={(e) => setCurrentMenu({ ...currentMenu, product_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={currentMenu.product_price}
                                        onChange={(e) => setCurrentMenu({ ...currentMenu, product_price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label>
                                    <textarea
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                                        value={currentMenu.product_description}
                                        onChange={(e) => setCurrentMenu({ ...currentMenu, product_description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk (File)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition cursor-pointer relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files[0])}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <ImageIcon size={32} className="mb-2 text-gray-400" />
                                            <span className="text-sm font-medium">
                                                {imageFile ? imageFile.name : "Klik untuk upload gambar"}
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</span>
                                        </div>
                                    </div>
                                    {isEditing && !imageFile && currentMenu.product_url_image && (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500 mb-1">Gambar saat ini:</p>
                                            <img src={currentMenu.product_url_image} alt="Current" className="h-16 w-16 object-cover rounded" />
                                        </div>
                                    )}
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition">
                                        Batal
                                    </button>
                                    <button type="submit" className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-medium transition shadow-lg shadow-orange-300/50 flex justify-center items-center gap-2">
                                        <Save size={18} /> {isEditing ? 'Update' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, text, active, isOpen, badge, onClick }) => (
    <div onClick={onClick} className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 relative group select-none ${active ? 'bg-orange-600 text-white shadow-md translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-white'} ${!isOpen ? 'md:justify-center' : ''}`}>
        <div className="flex-shrink-0">{icon}</div>
        <span className={`ml-3 font-medium transition-all duration-300 whitespace-nowrap ${!isOpen ? 'md:w-0 md:opacity-0 md:overflow-hidden' : 'w-auto opacity-100'}`}>{text}</span>
        {badge && isOpen && (
            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {badge}
            </span>
        )}
    </div>
);

export default AdminDashboard;