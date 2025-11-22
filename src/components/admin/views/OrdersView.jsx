import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Search, Eye, Filter, Loader, X,
    CheckCircle, Clock, XCircle, AlertCircle, ShoppingBag,
    Trash2, Edit, Save, Minus, Plus
} from "lucide-react";

export default function OrdersView() {
    // --- STATE ---
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter & Search
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal Detail & Edit
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false); // State untuk mode edit produk
    const [editFormData, setEditFormData] = useState([]); // State sementara untuk edit produk

    // URL Gambar
    const STORAGE_URL = "http://127.0.0.1:8000/storage/";

    // --- 1. FETCH DATA ORDERS ---
    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = response.data.Orders || [];
            setOrders(data);
            setFilteredOrders(data);

        } catch (error) {
            console.error("Gagal mengambil data pesanan:", error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // --- 2. FILTERING LOGIC ---
    useEffect(() => {
        let result = orders;

        if (statusFilter !== "all") {
            result = result.filter(o => o.status === statusFilter);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(o =>
                o.id.toString().includes(term) ||
                o.user_id.toString().includes(term)
            );
        }

        setFilteredOrders(result);
    }, [orders, statusFilter, searchTerm]);

    // --- 3. ACTIONS: DETAIL, DELETE, UPDATE ---

    // A. GET DETAIL
    const handleViewDetail = async (orderId) => {
        const token = localStorage.getItem('token');
        setIsDetailLoading(true);
        setIsEditingMode(false); // Reset edit mode saat buka baru
        setSelectedOrder({ id: orderId });

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const detail = response.data.order || response.data.Order;
            setSelectedOrder(detail);

            // Siapkan data untuk form edit (jika nanti mau diedit)
            if (detail && detail.products) {
                const initialEditData = detail.products.map(p => ({
                    product_id: p.id, // ID Produk
                    product_name: p.product_name,
                    product_price: p.product_price,
                    product_url_image: p.product_url_image,
                    quantity: p.pivot.quantity // Quantity dari pivot
                }));
                setEditFormData(initialEditData);
            }

        } catch (error) {
            console.error("Gagal ambil detail:", error);
            alert("Gagal memuat detail pesanan.");
            setSelectedOrder(null);
        } finally {
            setIsDetailLoading(false);
        }
    };

    // B. DELETE ORDER
    const handleDeleteOrder = async (id) => {
        if (!window.confirm(`Yakin ingin menghapus pesanan #${id}? Data tidak bisa dikembalikan.`)) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/order/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Pesanan berhasil dihapus.");
            fetchOrders(); // Refresh list
            if (selectedOrder?.id === id) setSelectedOrder(null); // Tutup modal jika sedang dibuka

        } catch (error) {
            console.error("Gagal hapus order:", error);
            alert("Gagal menghapus pesanan.");
        }
    };

    // C. UPDATE STATUS (PATCH)
    const handleUpdateStatus = async (newStatus) => {
        if (!window.confirm(`Ubah status menjadi ${newStatus}?`)) return;

        const token = localStorage.getItem('token');
        setIsProcessing(true);

        try {
            await axios.patch(`http://127.0.0.1:8000/api/order/${selectedOrder.id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Status berhasil diperbarui!");
            fetchOrders(); // Refresh list background

            // Update local state agar UI modal langsung berubah tanpa fetch ulang detail
            setSelectedOrder(prev => ({ ...prev, status: newStatus }));

        } catch (error) {
            console.error("Gagal update status:", error);
            alert("Gagal memperbarui status.");
        } finally {
            setIsProcessing(false);
        }
    };

    // D. EDIT PRODUCT QUANTITY (PUT)
    const handleSaveChanges = async () => {
        const token = localStorage.getItem('token');
        setIsProcessing(true);

        // Format payload sesuai permintaan backend
        const payload = {
            products: editFormData.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
            }))
        };

        try {
            // Menggunakan PUT untuk update items pesanan
            await axios.put(`http://127.0.0.1:8000/api/order/${selectedOrder.id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Pesanan berhasil diubah!");
            setIsEditingMode(false);
            fetchOrders(); // Refresh list utama
            handleViewDetail(selectedOrder.id); // Refresh detail modal

        } catch (error) {
            console.error("Gagal update pesanan:", error);
            alert("Gagal mengubah pesanan. Pastikan stok tersedia atau input valid.");
        } finally {
            setIsProcessing(false);
        }
    };

    // --- HELPER EDIT FORM ---
    const updateQuantity = (index, delta) => {
        const newData = [...editFormData];
        const newQty = newData[index].quantity + delta;
        if (newQty > 0) {
            newData[index].quantity = newQty;
            setEditFormData(newData);
        }
    };

    const removeProductFromEdit = (index) => {
        if (editFormData.length === 1) {
            alert("Pesanan harus memiliki minimal 1 produk. Silakan hapus pesanan jika ingin membatalkan.");
            return;
        }
        const newData = editFormData.filter((_, i) => i !== index);
        setEditFormData(newData);
    };

    // --- HELPER FORMATTER ---
    const formatRupiah = (num) => parseInt(num || 0).toLocaleString("id-ID");
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID", {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed': return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12} /> Selesai</span>;
            case 'processing': return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> Diproses</span>;
            case 'cancelled': return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12} /> Batal</span>;
            default: return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1 w-fit"><AlertCircle size={12} /> Pending</span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* HEADER & FILTER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manajemen Pesanan ({filteredOrders.length})
                </h2>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari ID Order..."
                            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            className="pl-9 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none text-sm appearance-none bg-white cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Diproses</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TABEL DATA */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">ID Order</th>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Tanggal</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-10">
                                        <div className="flex flex-col items-center text-gray-500">
                                            <Loader className="animate-spin text-orange-500 mb-2" size={24} />
                                            Memuat data pesanan...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-mono text-xs">#{order.id}</td>
                                        <td className="px-6 py-4">User #{order.user_id}</td>
                                        <td className="px-6 py-4 text-xs">{formatDate(order.created_at)}</td>
                                        <td className="px-6 py-4 font-semibold text-orange-600">Rp {formatRupiah(order.total_price)}</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetail(order.id)}
                                                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                                                    title="Hapus Pesanan"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500">
                                        Tidak ada pesanan ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DETAIL & EDIT PESANAN */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                        {/* Modal Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-orange-50">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                {isEditingMode ? "Edit Pesanan" : "Detail Pesanan"} #{selectedOrder.id}
                                {isEditingMode && <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded">Mode Edit</span>}
                            </h3>
                            <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-200 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {isDetailLoading ? (
                                <div className="text-center py-10 text-gray-500">
                                    <Loader className="animate-spin mx-auto mb-2" /> Memuat detail...
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Info Grid (Non-Editable) */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-gray-500 text-xs">Status Saat Ini</p>
                                            <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-gray-500 text-xs">Tanggal Pemesanan</p>
                                            <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                                        </div>
                                    </div>

                                    {/* --- MODE EDIT: FORM EDIT ITEM --- */}
                                    {isEditingMode ? (
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <Edit size={16} className="text-orange-500" /> Edit Item
                                            </h4>
                                            <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
                                                {editFormData.map((item, index) => (
                                                    <div key={item.product_id} className="flex gap-4 items-center border-b last:border-0 pb-3 last:pb-0">
                                                        <img
                                                            src={`${STORAGE_URL}${item.product_url_image}`}
                                                            alt=""
                                                            className="w-12 h-12 rounded-md object-cover bg-white border"
                                                            onError={(e) => e.target.src = "https://placehold.co/100?text=IMG"}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-bold text-sm text-gray-800">{item.product_name}</p>
                                                            <p className="text-xs text-orange-600 font-semibold">
                                                                @ Rp {formatRupiah(item.product_price)}
                                                            </p>
                                                        </div>

                                                        {/* Kontrol Quantity */}
                                                        <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
                                                            <button
                                                                onClick={() => updateQuantity(index, -1)}
                                                                className="p-1 hover:bg-gray-100 rounded"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(index, 1)}
                                                                className="p-1 hover:bg-gray-100 rounded"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeProductFromEdit(index)}
                                                            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                                                            title="Hapus dari pesanan"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 text-right text-sm text-gray-500 italic">
                                                *Harga total akan dikalkulasi ulang otomatis
                                            </div>
                                        </div>
                                    ) : (
                                        /* --- MODE VIEW: LIST ITEM --- */
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                                    <ShoppingBag size={16} className="text-orange-500" /> Item Pesanan
                                                </h4>
                                                {/* Tombol Masuk Mode Edit (Hanya jika pending/processing) */}
                                                {['pending', 'processing'].includes(selectedOrder.status) && (
                                                    <button
                                                        onClick={() => setIsEditingMode(true)}
                                                        className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                                                    >
                                                        <Edit size={12} /> Edit Item
                                                    </button>
                                                )}
                                            </div>
                                            <div className="space-y-3 border rounded-lg p-4">
                                                {selectedOrder.products?.map((product) => (
                                                    <div key={product.id} className="flex gap-4 items-start border-b last:border-0 pb-3 last:pb-0">
                                                        <img
                                                            src={`${STORAGE_URL}${product.product_url_image}`}
                                                            alt={product.product_name}
                                                            className="w-16 h-16 rounded-md object-cover bg-gray-200"
                                                            onError={(e) => e.target.src = "https://placehold.co/100?text=IMG"}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-bold text-gray-800">{product.product_name}</p>
                                                            <div className="flex justify-between mt-1 text-sm">
                                                                <span className="text-gray-600">{product.pivot?.quantity} x {formatRupiah(product.pivot?.price_at_time)}</span>
                                                                <span className="font-bold text-orange-600">
                                                                    {formatRupiah(product.pivot?.quantity * product.pivot?.price_at_time)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Total Price Display */}
                                    <div className="flex justify-between items-center border-t pt-4">
                                        <span className="font-bold text-gray-700 text-lg">Total Transaksi</span>
                                        <span className="font-black text-2xl text-orange-600">
                                            {/* Jika mode edit, hitung manual perkiraan total baru */}
                                            {isEditingMode ? (
                                                `Est. Rp ${formatRupiah(editFormData.reduce((sum, item) => sum + (item.quantity * item.product_price), 0))}`
                                            ) : (
                                                `Rp ${formatRupiah(selectedOrder.total_price)}`
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer (Actions) */}
                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 flex-wrap">

                            {isEditingMode ? (
                                // --- TOMBOL AKSI SAAT MODE EDIT ---
                                <>
                                    <button
                                        onClick={() => setIsEditingMode(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white text-sm font-semibold transition"
                                        disabled={isProcessing}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSaveChanges}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold text-sm transition flex items-center gap-2"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Menyimpan..." : <><Save size={16} /> Simpan Perubahan</>}
                                    </button>
                                </>
                            ) : (
                                // --- TOMBOL AKSI SAAT MODE VIEW ---
                                <>
                                    {isProcessing && <span className="text-sm text-gray-500 self-center animate-pulse">Updating...</span>}

                                    {selectedOrder.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus('cancelled')}
                                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold text-sm transition"
                                                disabled={isProcessing}
                                            >
                                                Tolak
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus('processing')}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition"
                                                disabled={isProcessing}
                                            >
                                                Proses Pesanan
                                            </button>
                                        </>
                                    )}

                                    {selectedOrder.status === 'processing' && (
                                        <button
                                            onClick={() => handleUpdateStatus('completed')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition"
                                            disabled={isProcessing}
                                        >
                                            Selesaikan Pesanan
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white text-sm font-semibold transition"
                                    >
                                        Tutup
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}