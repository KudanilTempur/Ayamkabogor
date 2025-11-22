import React from 'react';

// Kita tidak butuh 'recharts' lagi sesuai desain baru
// Pastikan props menerima: menus, reviews, orders, DAN customers
export default function DashboardView({ menus = [], reviews = [], orders = [], customers = [] }) {

    // --- 1. HITUNG STATISTIK ---
    const totalPengguna = customers.length || 0;
    const totalPesanan = orders.length || 0;
    const totalMenu = menus.length || 0;

    // Data Mockup / Hitungan Sederhana (Sesuaikan logika ini nanti jika ada data real)
    const penggunaBaru = 10; // Angka statis sementara
    const pesananBaru = orders.filter(o => o.status === 'Proses' || o.status === 'pending').length || 0;
    const klikCTA = 27; // Angka statis sementara

    // --- 2. KOMPONEN KARTU (Helper Component) ---
    const StatCard = ({ title, count, iconPath }) => (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
            {/* Kotak Icon Oranye */}
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white shrink-0">
                {iconPath}
            </div>
            {/* Text */}
            <div>
                <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    );

    // --- 3. ICONS (SVG) ---
    const IconUser = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    const IconOrder = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18.182 12.12 21 20.85 12.5" /><path d="M7 2h10a2 2 0 0 1 2 2v14.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /></svg>;
    const IconMenu = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></svg>;
    const IconCursor = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 12-9-9" /><path d="M19 9 10 18l-3-3" /><path d="m21 21-9-9" /></svg>;

    return (
        <div className="space-y-8">

            {/* --- BAGIAN 1: DASHBOARD UTAMA --- */}
            {/* (Total Pengunjung dihilangkan sesuai request) */}
            <div>
                <h2 className="text-orange-500 font-bold mb-4 text-lg">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Pengguna"
                        count={totalPengguna}
                        iconPath={IconUser}
                    />
                    <StatCard
                        title="Total Pesanan"
                        count={totalPesanan}
                        iconPath={IconOrder}
                    />
                    <StatCard
                        title="Total Menu"
                        count={totalMenu}
                        iconPath={IconMenu}
                    />
                </div>
            </div>

            {/* --- BAGIAN 2: AKTIVITAS TERKINI --- */}
            {/* (Pengunjung Website dihilangkan sesuai request) */}
            <div>
                <h2 className="text-orange-500 font-bold mb-4 text-lg">Aktivitas Terkini</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Pengguna Baru"
                        count={penggunaBaru}
                        iconPath={IconUser}
                    />
                    <StatCard
                        title="Pesanan Baru"
                        count={pesananBaru}
                        iconPath={IconOrder}
                    />
                    <StatCard
                        title="Klik CTA Hari Ini"
                        count={klikCTA}
                        iconPath={IconCursor}
                    />
                </div>
            </div>

            {/* --- BAGIAN 3: DATE FILTER --- */}
            {/* (Aksi Cepat Tambah Menu sudah dihilangkan) */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-orange-500 font-bold text-sm mb-1 block">Tanggal Awal</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-orange-500 font-bold text-sm mb-1 block">Tanggal Akhir</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        />
                    </div>
                </div>
            </div>

            {/* --- BAGIAN 4: PRODUK TERLARIS --- */}
            <div>
                <h2 className="text-orange-500 font-bold mb-4 text-lg">Produk Terlaris</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mengambil 3 menu pertama sebagai dummy produk terlaris */}
                    {menus.slice(0, 3).map((menu) => (
                        <div key={menu.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                            {/* Gambar Produk */}
                            <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden shrink-0 border">
                                {menu.product_url_image ? (
                                    <img
                                        src={menu.product_url_image}
                                        alt={menu.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-100">
                                        No Img
                                    </div>
                                )}
                            </div>
                            {/* Info Produk */}
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg line-clamp-1" title={menu.name}>
                                    {menu.name || menu.product_name}
                                </h3>
                                <p className="text-sm text-gray-500">150 Pcs Terjual</p>
                            </div>
                        </div>
                    ))}

                    {menus.length === 0 && (
                        <p className="text-gray-400 text-sm italic col-span-full">Belum ada data produk.</p>
                    )}
                </div>
            </div>

        </div>
    );
}