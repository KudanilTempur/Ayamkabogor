import React from "react";
import {
    LayoutDashboard,
    Utensils,
    MessageSquare,
    ShoppingBag,
    Users,
    LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, handleLogout, isSidebarOpen }) {
    const menuItems = [
        { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { tab: 'menu', label: 'Kelola Produk', icon: <Utensils size={20} /> },
        { tab: 'reviews', label: 'Ulasan', icon: <MessageSquare size={20} /> },
        { tab: 'orders', label: 'Pesanan', icon: <ShoppingBag size={20} /> },
        { tab: 'customers', label: 'Pelanggan', icon: <Users size={20} /> },
    ];

    return (
        <aside
            className={`
                bg-gray-900 text-white z-30 shadow-xl
                fixed inset-y-0 left-0
                transform transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static
                w-64 h-screen flex flex-col
            `}
        >
            <div className="h-16 flex items-center justify-center border-b border-gray-800">
                <h1 className="font-bold text-xl text-orange-500">ADMIN CMS</h1>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                {menuItems.map(item => (
                    <div
                        key={item.tab}
                        onClick={() => setActiveTab(item.tab)}
                        className={`
                            flex items-center cursor-pointer px-3 py-3 rounded-xl
                            transition-all duration-200
                            ${activeTab === item.tab
                                ? 'bg-orange-600 text-white shadow-md'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                        `}
                    >
                        {item.icon}
                        <span className="ml-3 font-medium">{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="p-3 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 text-red-400"
                >
                    <LogOut size={20} />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </aside>
    );
}
