import React, { createContext, useState, useContext, useEffect } from 'react';

const MenuContext = createContext();

// Data awal (Default)
const INITIAL_MENUS = [
    { id: 1, name: "Ayam Bakar Madu", price: 25000, category: "Makanan", description: "Ayam bakar dengan olesan madu spesial.", image: "https://placehold.co/400x400/orange/white?text=Ayam+Bakar" },
    { id: 2, name: "Ayam Goreng Serundeng", price: 22000, category: "Makanan", description: "Ayam goreng gurih dengan taburan serundeng.", image: "https://placehold.co/400x400/orange/white?text=Ayam+Goreng" },
    { id: 3, name: "Es Jeruk Segar", price: 8000, category: "Minuman", description: "Perasan jeruk asli menyegarkan.", image: "https://placehold.co/400x400/orange/white?text=Es+Jeruk" },
    { id: 4, name: "Sambal Dadak", price: 5000, category: "Tambahan", description: "Sambal super pedas buat kamu.", image: "https://placehold.co/400x400/orange/white?text=Sambal" },
];

export const MenuProvider = ({ children }) => {
    // Cek apakah ada data menu tersimpan di LocalStorage? Kalau tidak ada, pakai INITIAL_MENUS
    const [menus, setMenus] = useState(() => {
        const savedMenus = localStorage.getItem('ayamKabogorMenus');
        return savedMenus ? JSON.parse(savedMenus) : INITIAL_MENUS;
    });

    // Simpan ke LocalStorage tiap kali ada perubahan (Edit/Hapus/Tambah)
    useEffect(() => {
        localStorage.setItem('ayamKabogorMenus', JSON.stringify(menus));
    }, [menus]);

    // --- FUNGSI-FUNGSI ADMIN ---

    // 1. Edit Menu
    const editMenu = (id, updatedData) => {
        setMenus(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    };

    // 2. Hapus Menu
    const deleteMenu = (id) => {
        if (window.confirm("Yakin mau hapus menu ini?")) {
            setMenus(prev => prev.filter(item => item.id !== id));
        }
    };

    // 3. Tambah Menu Baru
    const addMenu = (newData) => {
        const newId = menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;
        setMenus([...menus, { ...newData, id: newId }]);
    };

    // 4. Reset ke Default (Untuk Testing)
    const resetMenu = () => {
        setMenus(INITIAL_MENUS);
    }

    const fetchMenusFromBackend = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            const data = response.data.data ?? response.data;
            setMenus(data);
        } catch (err) {
            console.error("Fetch Menu Error:", err);
        }
    };




    return (
        <MenuContext.Provider value={{ menus, editMenu, deleteMenu, addMenu, resetMenu, fetchMenusFromBackend }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);