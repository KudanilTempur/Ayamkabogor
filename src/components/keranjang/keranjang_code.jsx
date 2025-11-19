import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

// DATA CONTOH PRODUK (Mock Data)
const initialCartData = [
    {
        id: 1,
        name: "Ayam Bakar Madu",
        description: "Potongan dada, sambal terpisah",
        price: 25000,
        quantity: 1,
        image: "https://placehold.co/150x150/e2e8f0/888888?text=Img" // Ganti dengan gambar asli
    },
    {
        id: 2,
        name: "Paket Nasi Liwet",
        description: "Nasi liwet, ayam goreng, tahu tempe",
        price: 35000,
        quantity: 1,
        image: "https://placehold.co/150x150/e2e8f0/888888?text=Img"
    },
    {
        id: 3,
        name: "Es Jeruk Kelapa",
        description: "Gelas besar, gula batu",
        price: 15000,
        quantity: 2,
        image: "https://placehold.co/150x150/e2e8f0/888888?text=Img"
    }
];

const KeranjangBelanja = () => {
    const [cartItems, setCartItems] = useState(initialCartData);

    // Fungsi Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Tambah Jumlah
    const increaseQty = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Fungsi Kurang Jumlah (Minimal 1)
    const decreaseQty = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Fungsi Hapus Item
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Hitung Total
    const totalProduk = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalHarga = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <section className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-600 pb-32 pt-8 md:pt-12">

            <div className="max-w-4xl mx-auto px-4">

                {/* --- JUDUL HALAMAN --- */}
                <div className="text-center mb-10">
                    <h1
                        className="text-4xl md:text-6xl font-black italic uppercase tracking-wider"
                        style={{
                            color: '#8B4513', // Warna Cokelat dasar
                            textShadow: '2px 2px 0px rgba(255,255,255,0.5), 4px 4px 2px rgba(0,0,0,0.2)' // Efek timbul
                        }}
                    >
                        KERANJANG BELANJA
                    </h1>
                </div>

                {/* --- LIST PRODUK --- */}
                <div className="flex flex-col space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-xl">
                            <p className="text-xl text-gray-600 font-bold">Keranjang Anda masih kosong.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-orange-500 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-center gap-4 text-white relative"
                            >
                                {/* Gambar Produk */}
                                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Info Produk */}
                                <div className="flex-1 text-center md:text-left w-full">
                                    <h3 className="font-bold text-lg md:text-xl">{item.name}</h3>
                                    <p className="text-orange-100 text-sm mb-2">{item.description}</p>

                                    {/* Harga Satuan (Mobile View) */}
                                    <p className="md:hidden text-sm font-semibold mb-2">{formatRupiah(item.price)}</p>
                                </div>

                                {/* Kontrol Jumlah & Harga */}
                                <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">

                                    {/* Tombol + - */}
                                    <div className="flex items-center bg-black/20 rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="p-1 hover:text-orange-200 transition-colors"
                                        >
                                            <Minus size={16} strokeWidth={3} />
                                        </button>
                                        <span className="mx-3 font-bold min-w-[20px] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQty(item.id)}
                                            className="p-1 hover:text-orange-200 transition-colors"
                                        >
                                            <Plus size={16} strokeWidth={3} />
                                        </button>
                                    </div>

                                    {/* Harga Satuan (Desktop) */}
                                    <div className="hidden md:block text-right w-32">
                                        <p className="text-xs text-orange-100">Satuan</p>
                                        <p className="font-bold">{formatRupiah(item.price)}</p>
                                    </div>

                                    {/* Total Harga per Item */}
                                    <div className="text-right w-32">
                                        <p className="text-xs text-orange-100 md:hidden">Total</p>
                                        <p className="font-bold text-lg">{formatRupiah(item.price * item.quantity)}</p>
                                    </div>

                                    {/* Tombol Hapus */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 bg-red-600/20 hover:bg-red-600 hover:text-white rounded-full transition-colors text-red-100"
                                        title="Hapus item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>

            {/* --- FOOTER TOTAL (Sticky Bottom) --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#8B4513] text-white py-4 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] z-40">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Info Kiri */}
                    <div className="text-center md:text-left">
                        <p className="text-orange-200 text-sm">Total Produk: <span className="font-bold text-white">{totalProduk} Item</span></p>
                    </div>

                    {/* Info Kanan: Harga & Tombol */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                            <p className="text-xs text-orange-200">Total Pembayaran</p>
                            <p className="text-xl md:text-2xl font-bold">{formatRupiah(totalHarga)}</p>
                        </div>

                        <button
                            onClick={() => alert("Melanjutkan ke WhatsApp...")}
                            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
                        >
                            PESAN
                        </button>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default KeranjangBelanja;