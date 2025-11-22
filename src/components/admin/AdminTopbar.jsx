import React from "react";
import { Menu as MenuIcon } from 'lucide-react';

export default function AdminTopbar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-600 p-2 hover:bg-gray-100 rounded-md md:hidden"
            >
                <MenuIcon size={24} />
            </button>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">Halo, Admin</span>
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </header>
    );
}
