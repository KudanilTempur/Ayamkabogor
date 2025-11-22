import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import CustomersView from "./views/CustomersView"; // ✅ Import Baru
// Sesuaikan path import ini dengan struktur folder Anda
import Sidebar from "./Sidebar";
import AdminTopbar from "./AdminTopbar";
import DashboardView from "./views/DashboardView";
import MenuManagerView from "./views/MenuManagerView";
// ✅ Import ReviewsView yang baru
import ReviewsView from "./views/ReviewsView";
// Import OrdersView yang baru
import OrdersView from "./views/OrdersView";

// Placeholder (Sudah tidak dipakai lagi di switch case utama, tapi biarkan saja untuk safety)
const PlaceholderView = ({ title }) => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center h-96 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-400 mb-2">{title}</h2>
        <p className="text-gray-400">Fitur ini sedang dalam pengembangan.</p>
    </div>
);

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();

    // Cek Login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Render Konten Berdasarkan Tab Aktif
    const renderContent = () => {
        switch (activeTab) {
            case "dashboard": return <DashboardView />;
            case "menu": return <MenuManagerView />;
            case "orders": return <OrdersView />;
            case "reviews": return <ReviewsView />;

            // ✅ Fitur Customers sudah aktif
            case "customers": return <CustomersView />;

            default: return <DashboardView />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* SIDEBAR */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* TOPBAR */}
                <AdminTopbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* CONTENT AREA */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
                    <div className="container mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}