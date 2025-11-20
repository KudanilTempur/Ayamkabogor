import React, { useState } from 'react';
import { ShoppingBag, Clock, CheckCircle, XCircle, ChevronRight, AlertCircle } from 'lucide-react';

const RiwayatPesanan = () => {
    // State untuk melacak pesanan mana yang detailnya sedang dilihat.
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Mock Data (Data Palsu untuk Tampilan)
    // Mengubah status menjadi Bahasa Indonesia agar sesuai dengan getStatusIcon
    const orders = [
        {
            id: "ORD-20250115-001",
            date: "15 Jan 2025",
            status: "Selesai", // completed
            total: 150000,
            items: "Ayam Bakar Madu (2), Nasi Liwet (2), Es Jeruk (2)",
            image: "https://placehold.co/100x100/38A169/white?text=Selesai" // Warna hijau
        },
        {
            id: "ORD-20250210-023",
            date: "10 Feb 2025",
            status: "Diproses", // processing
            total: 85000,
            items: "Paket Hemat A (1), Ayam Goreng Kremes (1)",
            image: "https://placehold.co/100x100/ECC94B/white?text=Proses" // Warna kuning
        },
        {
            id: "ORD-20250212-045",
            date: "12 Feb 2025",
            status: "Dibatalkan", // cancelled
            total: 45000,
            items: "Ayam Penyet Sambal Ijo (1)",
            image: "https://placehold.co/100x100/E53E3E/white?text=Batal" // Warna merah
        },
        {
            id: "ORD-20250215-067",
            date: "15 Feb 2025",
            status: "Pending", // pending
            total: 45000,
            items: "Ayam Penyet Sambal Ijo (1)",
            image: "https://placehold.co/100x100/A0AEC0/white?text=Pending" // Warna abu-abu
        }
    ];

    // Fungsi yang dipanggil saat tombol "Lihat Detail" diklik
    const handleViewDetail = (orderId) => {
        setSelectedOrderId(orderId);
        // Di sini seharusnya ada logika untuk:
        // 1. Navigasi ke halaman detail pesanan: navigate(`/orders/${orderId}`)
        // 2. Atau menampilkan Modal (pop-up) detail pesanan.
        console.log(`Anda mengklik detail untuk Pesanan ID: ${orderId}.`);
        // Simulasikan tampilan modal (pop-up) dengan timeout
        setTimeout(() => setSelectedOrderId(null), 3000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Selesai': return 'bg-green-100 text-green-700 border-green-200';
            case 'Diproses': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Dibatalkan': return 'bg-red-100 text-red-700 border-red-200';
            case 'Pending': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selesai': return <CheckCircle size={16} />;
            case 'Diproses': return <Clock size={16} />;
            case 'Dibatalkan': return <XCircle size={16} />;
            case 'Pending': return <AlertCircle size={16} />;
            default: return <ShoppingBag size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-orange-900 flex items-center gap-2">
                        <ShoppingBag className="text-orange-600" /> Riwayat Pesanan
                    </h1>
                    <p className="text-gray-600 mt-1">Pantau status pesananmu di sini.</p>
                </div>

                {/* List Pesanan */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden transition-shadow">

                            {/* Baris Atas: Info Order */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-50 gap-4">
                                <div className="flex gap-4 items-start">
                                    <img
                                        src={order.image}
                                        alt="Menu"
                                        className="w-16 h-16 rounded-lg object-cover bg-gray-100 shadow-inner"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/AAAAAA/FFFFFF?text=Menu"; }}
                                    />
                                    <div>
                                        <p className="text-xs text-gray-400 font-mono">#{order.id}</p>
                                        <h3 className="font-bold text-gray-800 line-clamp-1">{order.items}</h3>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                </div>
                                {/* Status Chip */}
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 min-w-[100px] justify-center ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>

                            {/* Baris Bawah: Total & Tombol */}
                            <div className="bg-orange-50/50 p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-500">Total Belanja</p>
                                    <p className="font-bold text-lg text-orange-700">Rp {order.total.toLocaleString('id-ID')}</p>
                                </div>
                                <button
                                    onClick={() => handleViewDetail(order.id)}
                                    className="text-sm font-semibold text-white bg-orange-600 px-4 py-2 rounded-lg flex items-center hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
                                >
                                    Lihat Detail <ChevronRight size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simulated Modal/Message Box (hanya untuk menunjukkan tombol berfungsi) */}
                {selectedOrderId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-sm w-full">
                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-bold text-lg text-gray-800">Tombol Berfungsi!</h3>
                            <p className="text-gray-600 mt-2">
                                Detail pesanan <span className="font-mono text-xs bg-gray-100 p-1 rounded">#{selectedOrderId}</span> seharusnya ditampilkan di sini.
                            </p>
                            <button
                                onClick={() => setSelectedOrderId(null)}
                                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiwayatPesanan;