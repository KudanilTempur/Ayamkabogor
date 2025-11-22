import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. INISIALISASI: Cek LocalStorage dulu agar data tidak hilang saat refresh
    // (Saya ubah dari memory-only menjadi local storage enabled untuk memperbaiki masalah Anda)
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('ayamKabogorCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    });

    // 2. EFFECT: Simpan ke LocalStorage setiap kali cart berubah
    useEffect(() => {
        localStorage.setItem('ayamKabogorCart', JSON.stringify(cart));
    }, [cart]);

    // --- LOGIKA DARI KODE ANDA (Dioptimalkan) ---

    // Tambah item ke keranjang
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // Kalau sudah ada, tambah quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Kalau belum ada, tambah item baru
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        // Alert notifikasi
        alert(`✅ ${product.name} ditambahkan ke keranjang!`);
    };

    // Hapus item dari keranjang
    const removeFromCart = (id) => {
        // Cari item dulu untuk keperluan alert
        const itemToRemove = cart.find(i => i.id === id);

        if (itemToRemove) {
            alert(`🗑️ ${itemToRemove.name} dihapus dari keranjang`);
        }

        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Update quantity (+/- 1)
    const updateQuantity = (id, amount) => {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + amount;
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter((item) => item.quantity > 0); // Filter otomatis hapus jika 0
        });
    };

    // Kosongkan keranjang
    const clearCart = () => {
        if (window.confirm('Yakin mau hapus semua item di keranjang?')) {
            setCart([]);
            alert('🗑️ Keranjang dikosongkan');
        }
    };

    // Hitung total harga
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Hitung total item
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart harus dipakai di dalam CartProvider!');
    }
    return context;
};