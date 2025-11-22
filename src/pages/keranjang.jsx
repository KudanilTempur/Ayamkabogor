import React from 'react';
import { FaTrash, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';

// ✅ Import CartContext
import { useCart } from '../contexts/CartContext';

const Keranjang_belanja = () => {
    // ✅ Ambil data dan fungsi dari CartContext
    const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

    // --- LOGIKA CHECKOUT WHATSAPP ---
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Keranjang masih kosong! Tambahkan menu terlebih dahulu.');
            return;
        }

        // 1. Nomor WA Admin (Ganti dengan nomor asli, format 62...)
        const phoneNumber = "628123456789";

        // 2. Header Pesan
        let message = "Halo Admin Ayam Kabogor, saya mau pesan:\n\n";

        // 3. Loop Barang
        cart.forEach((item, index) => {
            // Format: 1. Nasi Bakar (1x) - Rp 25.000
            message += `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
        });

        // 4. Hitung Total
        const totalHarga = getTotalPrice();

        // Footer Pesan
        message += `\n*Total Bayar: Rp ${totalHarga.toLocaleString('id-ID')}*`;
        message += "\n\nMohon info ongkirnya ya, terima kasih! 🙏";

        // 5. Kirim ke WA
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const totalHarga = getTotalPrice();

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black text-orange-800">KERANJANG BELANJA</h1>

                    {/* Tombol Kosongkan Keranjang */}
                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-sm text-red-500 hover:text-red-700 font-semibold hover:underline transition"
                        >
                            Kosongkan Keranjang
                        </button>
                    )}
                </div>

                {/* ✅ Empty State */}
                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                        <div className="mb-6">
                            <div className="text-6xl mb-4">🛒</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
                            <p className="text-gray-500">Belum ada menu yang ditambahkan nih!</p>
                        </div>
                        <a
                            href="/menu-lengkap"
                            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md"
                        >
                            Lihat Menu
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {/* List Items */}
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center border border-orange-100 hover:shadow-md transition-shadow">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-lg object-cover bg-gray-200"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                                        <p className="text-orange-600 font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                        </p>
                                    </div>

                                    {/* Kontrol Jumlah */}
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-2 hover:bg-white rounded shadow-sm transition text-orange-600 active:scale-90"
                                            aria-label="Kurangi jumlah"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="font-bold w-8 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-2 hover:bg-white rounded shadow-sm transition text-orange-600 active:scale-90"
                                            aria-label="Tambah jumlah"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition"
                                        aria-label="Hapus item"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer Total & Checkout */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 mt-4">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Total Item</span>
                                    <span className="font-semibold">{cart.length} Jenis</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Jumlah</span>
                                    <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} Porsi</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-800">Total Pembayaran</span>
                                    <span className="text-2xl font-black text-orange-800">
                                        Rp {totalHarga.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95"
                            >
                                <FaWhatsapp size={24} />
                                PESAN VIA WHATSAPP
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Klik tombol di atas untuk melanjutkan pemesanan via WhatsApp
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Keranjang_belanja;