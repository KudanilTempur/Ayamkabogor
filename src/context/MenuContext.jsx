import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    // Data Awal (Supaya tidak kosong saat pertama buka)
    const initialMenu = [
        { id: 1, name: "Ayam Bakar Madu", price: 25000, category: "Makanan", image: "https://placehold.co/200x200/orange/white?text=Ayam+Bakar", status: "Tersedia" },
        { id: 2, name: "Ayam Goreng Kremes", price: 24000, category: "Makanan", image: "https://placehold.co/200x200/orange/white?text=Ayam+Goreng", status: "Tersedia" },
        { id: 3, name: "Nasi Liwet Komplit", price: 30000, category: "Paket", image: "https://placehold.co/200x200/orange/white?text=Nasi+Liwet", status: "Tersedia" },
        { id: 4, name: "Es Jeruk Kelapa", price: 15000, category: "Minuman", image: "https://placehold.co/200x200/orange/white?text=Es+Jeruk", status: "Tersedia" },
    ];

    const [menus, setMenus] = useState(initialMenu);

    // Fungsi Tambah Menu (Dipakai Admin)
    const addMenu = (newMenu) => {
        const menuWithId = { ...newMenu, id: Date.now(), status: 'Tersedia' };
        setMenus([...menus, menuWithId]);
    };

    // Fungsi Hapus Menu (Dipakai Admin)
    const deleteMenu = (id) => {
        setMenus(menus.filter(menu => menu.id !== id));
    };

    return (
        <MenuContext.Provider value={{ menus, addMenu, deleteMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);