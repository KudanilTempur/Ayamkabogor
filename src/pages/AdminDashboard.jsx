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
    MessageSquare,
    Star,
    AlertCircle,
    Eye,
    Trash
} from 'lucide-react';

// URL API
const API_BASE_URL = "http://127.0.0.1:8000/api/products";
const REVIEWS_API_URL = "http://127.0.0.1:8000/api/reviews";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [activeTab, setActiveTab] = useState('dashboard');

    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [reviews, setReviews] = useState([]);

    // DATA PRODUK
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isReviewDetailOpen, setIsReviewDetailOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    // FORM
    const [currentMenu, setCurrentMenu] = useState({
        id: null,
        product_name: '',
        product_price: '',
        product_description: '',
        product_url_image: null
    });
    const [imageFile, setImageFile] = useState(null);

    // AXIOS SETUP
    useEffect(() => {
        axios.defaults.headers.common['Accept'] = 'application/json';
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // ===========================================
    // FETCH DATA
    // ===========================================
    const fetchCustomers = () => {
        setCustomers([
            { id: 1, name: "Budi Santoso", phone: "081234567890", totalOrders: 12 },
            { id: 2, name: "Sinta Ayu", phone: "081298765432", totalOrders: 5 },
            { id: 3, name: "Rizal Firmansyah", phone: "081266633344", totalOrders: 1 },
        ]);
    };

    const fetchOrders = () => {
        setOrders([
            { id: 1, customer: "Budi", total: 50000, status: "Selesai" },
            { id: 2, customer: "Sinta", total: 75000, status: "Proses" },
        ]);
    };

    // FETCH ULASAN DARI BACKEND
    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(REVIEWS_API_URL);
            const data = response.data.data ? response.data.data : response.data;
            setReviews(data);
        } catch (error) {
            console.error("Fetch Reviews Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // FETCH PRODUK DARI BACKEND
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

    // AMBIL DATA PERTAMA KALI
    useEffect(() => {
        fetchProducts();
        fetchCustomers();
        fetchOrders();
        fetchReviews();

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ========================================================
    // MODAL HANDLING
    // ========================================================
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
        setCurrentMenu(menu);
        setIsModalOpen(true);
    };

    const handleOpenReviewDetail = (review) => {
        setSelectedReview(review);
        setIsReviewDetailOpen(true);
    };

    // ========================================================
    // SAVE MENU
    // ========================================================
    const handleSaveMenu = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', currentMenu.product_name);
        formData.append('product_price', currentMenu.product_price);
        formData.append('product_description', currentMenu.product_description);

        if (imageFile) formData.append('product_img', imageFile);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            if (isEditing) {
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
            console.error("Save Error:", error);
            alert("Gagal menyimpan data.");
        }
    };

    // ========================================================
    // DELETE MENU
    // ========================================================
    const handleDeleteMenu = async (id) => {
        if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            alert("Produk berhasil dihapus");
            fetchProducts();
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Gagal menghapus data.");
        }
    };

    // ========================================================
    // DELETE REVIEW
    // ========================================================
    const handleDeleteReview = async (id) => {
        if (!window.confirm("Yakin ingin menghapus ulasan ini?")) return;
        try {
            await axios.delete(`${REVIEWS_API_URL}/${id}`);
            alert("Ulasan berhasil dihapus");
            fetchReviews();
        } catch (error) {
            console.error("Delete Review Error:", error);
            alert("Gagal menghapus ulasan.");
        }
    };

    // ========================================================
    // LOGOUT
    // ========================================================
    const handleLogout = () => {
        if (window.confirm("Keluar dari aplikasi?")) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    // ========================================================
    // RENDER STARS
    // ========================================================
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
            />
        ));
    };

    // ========================================================
    // HALAMAN DASHBOARD
    // ========================================================
    const DashboardView = () => {
        const stats = [
            { title: "Total Penjualan", value: "Rp 15.450.000", icon: <DollarSign />, color: "bg-green-500" },
            { title: "Pesanan Masuk", value: orders.length, icon: <ShoppingBag />, color: "bg-blue-500" },
            { title: "Total Menu", value: menus.length, icon: <Utensils />, color: "bg-orange-500" },
            { title: "Total Ulasan", value: reviews.length, icon: <MessageSquare />, color: "bg-purple-500" },
        ];

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Ringkasan Bisnis</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                            <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                                <h3 className="text-xl font-bold">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white h-80 rounded-xl shadow-md flex items-center justify-center">
                    Grafik Penjualan (Belum diisi)
                </div>
            </div>
        );
    };

    // ========================================================
    // VIEW ULASAN PELANGGAN
    // ========================================================
    const ReviewsView = () => {
        const filteredReviews = reviews.filter(review =>
            review.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.review_text?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Hitung rata-rata rating
        const averageRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Ulasan Pelanggan ({reviews.length})</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Rating Rata-rata: <span className="font-bold text-yellow-500">{averageRating} ★</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari ulasan berdasarkan produk atau komentar..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 min-w-[700px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Produk</th>
                                    <th className="px-6 py-3">Rating</th>
                                    <th className="px-6 py-3 w-1/3">Ulasan</th>
                                    <th className="px-6 py-3">Tanggal</th>
                                    <th className="px-6 py-3 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : filteredReviews.length > 0 ? (
                                    filteredReviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-purple-50/50">
                                            <td className="px-6 py-4 font-medium">{review.product_name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating)}
                                                    <span className="ml-1 text-xs text-gray-500">({review.rating})</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="line-clamp-2">{review.review_text}</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-500">
                                                {new Date(review.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center gap-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleOpenReviewDetail(review)}
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    title="Hapus Ulasan"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
                                            <AlertCircle size={32} className="mx-auto mb-2" />
                                            Tidak ada ulasan ditemukan
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

    // ========================================================
    // VIEW MENU PRODUK
    // ========================================================
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
                        className="bg-orange-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition"
                    >
                        <Plus size={18} /> Tambah Produk
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 min-w-[700px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 w-20">Gambar</th>
                                    <th className="px-6 py-3">Nama Produk</th>
                                    <th className="px-6 py-3 w-1/3">Deskripsi</th>
                                    <th className="px-6 py-3">Harga</th>
                                    <th className="px-6 py-3 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : filteredMenus.length > 0 ? (
                                    filteredMenus.map((item) => (
                                        <tr key={item.id} className="hover:bg-orange-50/50">
                                            <td className="px-6 py-4">
                                                {item.product_url_image ? (
                                                    <img
                                                        src={item.product_url_image}
                                                        alt={item.product_name}
                                                        className="w-12 h-12 rounded object-cover border"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                        No Img
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium">{item.product_name}</td>
                                            <td className="px-6 py-4">{item.product_description}</td>
                                            <td className="px-6 py-4 font-semibold">
                                                Rp {parseInt(item.product_price || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center gap-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleOpenEditModal(item)}
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleDeleteMenu(item.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
                                            <AlertCircle size={32} className="mx-auto mb-2" />
                                            Tidak ada produk ditemukan
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

    // ========================================================
    // SIDEBAR & MAIN LAYOUT
    // ========================================================
    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

            {/* Overlay Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-gray-900 text-white z-30 shadow-xl
                    fixed inset-y-0 left-0
                    transform transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static
                    w-64
                    h-screen flex flex-col
                `}
            >
                <div className="h-16 flex items-center justify-center border-b border-gray-800">
                    <h1 className="font-bold text-xl text-orange-500">ADMIN CMS</h1>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<Utensils size={20} />} text="Kelola Produk" active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
                    <SidebarItem icon={<MessageSquare size={20} />} text="Ulasan" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
                    <SidebarItem icon={<ShoppingBag size={20} />} text="Pesanan" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={<Users size={20} />} text="Pelanggan" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
                </nav>

                <div className="p-3 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 text-red-400">
                        <LogOut size={20} />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* TOP BAR */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-600 p-2 hover:bg-gray-100 rounded-md md:hidden"
                    >
                        <MenuIcon size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">Halo, Admin</span>
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'menu' && <MenuManagerView />}
                    {activeTab === 'reviews' && <ReviewsView />}

                    {activeTab === 'orders' && (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-bold mb-4">Data Pesanan</h2>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Pelanggan</th>
                                        <th className="px-4 py-2">Total</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o) => (
                                        <tr key={o.id} className="border-t">
                                            <td className="px-4 py-2">{o.id}</td>
                                            <td className="px-4 py-2">{o.customer}</td>
                                            <td className="px-4 py-2">Rp {o.total.toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-2">{o.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-bold mb-4">Data Pelanggan</h2>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Nama</th>
                                        <th className="px-4 py-2">No. Telepon</th>
                                        <th className="px-4 py-2">Total Pesanan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((c) => (
                                        <tr key={c.id} className="border-t">
                                            <td className="px-4 py-2">{c.id}</td>
                                            <td className="px-4 py-2">{c.name}</td>
                                            <td className="px-4 py-2">{c.phone}</td>
                                            <td className="px-4 py-2">{c.totalOrders}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* MODAL EDIT / ADD PRODUK */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">
                                {isEditing ? 'Edit Produk' : 'Tambah Produk'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X />
                            </button>
                        </div>

                        <form onSubmit={handleSaveMenu} className="p-6 space-y-4">
                            <div>
                                <label className="block mb-1">Nama Produk</label>
                                <input
                                    className="w-full border px-4 py-2 rounded"
                                    value={currentMenu.product_name}
                                    onChange={(e) =>
                                        setCurrentMenu({ ...currentMenu, product_name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Harga</label>
                                <input
                                    type="number"
                                    className="w-full border px-4 py-2 rounded"
                                    value={currentMenu.product_price}
                                    onChange={(e) =>
                                        setCurrentMenu({ ...currentMenu, product_price: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Deskripsi Produk</label>
                                <textarea
                                    rows="3"
                                    className="w-full border px-4 py-2 rounded"
                                    value={currentMenu.product_description}
                                    onChange={(e) =>
                                        setCurrentMenu({
                                            ...currentMenu,
                                            product_description: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded flex items-center justify-center gap-2"
                                >
                                    <Save size={18} /> {isEditing ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DETAIL ULASAN */}
            {isReviewDetailOpen && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                <MessageSquare size={20} className="text-purple-600" />
                                Detail Ulasan Pelanggan
                            </h3>
                            <button
                                onClick={() => setIsReviewDetailOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Produk yang Diulas */}
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                <label className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                                    Produk yang Diulas
                                </label>
                                <p className="text-lg font-bold text-gray-800 mt-1">
                                    {selectedReview.product_name}
                                </p>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                                    Rating Produk
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {renderStars(selectedReview.rating)}
                                    </div>
                                    <span className="text-2xl font-bold text-yellow-600">
                                        {selectedReview.rating}.0
                                    </span>
                                    <span className="text-sm text-gray-500">/ 5.0</span>
                                </div>
                            </div>

                            {/* Ulasan Text */}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                                    Isi Ulasan
                                </label>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[120px]">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedReview.review_text}
                                    </p>
                                </div>
                            </div>

                            {/* Tanggal */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                                        Tanggal Ulasan
                                    </label>
                                    <p className="text-sm text-gray-700">
                                        {new Date(selectedReview.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsReviewDetailOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Tutup
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteReview(selectedReview.id);
                                        setIsReviewDetailOpen(false);
                                    }}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                                >
                                    <Trash size={18} />
                                    Hapus Ulasan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


// ITEM SIDEBAR
const SidebarItem = ({ icon, text, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center cursor-pointer px-3 py-3 rounded-xl
            transition-all duration-200
            ${active ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
        `}
    >
        {icon}
        <span className="ml-3 font-medium">{text}</span>
    </div>
);

export default AdminDashboard;