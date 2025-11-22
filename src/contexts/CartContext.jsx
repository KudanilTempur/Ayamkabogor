import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // ... (Kode state dan useEffect sama seperti sebelumnya, tidak berubah) ...
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('ayamKabogorCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('ayamKabogorCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        // ... (kode sama) ...
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alert(`✅ ${product.name} ditambahkan ke keranjang!`);
    };

    const removeFromCart = (id) => {
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

    // Kosongkan keranjang (DIBUAT OTOMATIS TANPA CONFIRM)
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('ayamKabogorCart');
    };

    // Hitung total harga
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

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

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart harus dipakai di dalam CartProvider!');
    }
    return context;
};