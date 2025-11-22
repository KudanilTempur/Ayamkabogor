import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Layout Components
import Sidebar from './Sidebar';
import AdminTopbar from './AdminTopbar';

// Views
import DashboardView from "./views/DashboardView";
import MenuManagerView from "./views/MenuManagerView";
import ReviewsView from "./views/ReviewsView";
import OrdersView from "./views/OrdersView";
import CustomersView from "./views/CustomersView";

// Modals
import ProductModal from './modals/ProductModal';
import ReviewDetailModal from './modals/ReviewDetailModal';

// Context
import { useMenu } from "../../contexts/MenuContext";

const REVIEWS_API_URL = "http://127.0.0.1:8000/api/reviews";

const AdminDashboard = () => {

    // --- Ambil fungsi CRUD menu dari Context ---
    const { menus, addMenu, editMenu, deleteMenu } = useMenu();

    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [activeTab, setActiveTab] = useState('dashboard');

    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isReviewDetailOpen, setIsReviewDetailOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [currentMenu, setCurrentMenu] = useState({
        id: null,
        product_name: '',
        product_price: '',
        product_description: '',
        product_url_image: null,
    });

    const [imageFile, setImageFile] = useState(null);

    // ----------------------------------------------------
    // DUMMY DATA (UNTUK SAAT INI)
    // ----------------------------------------------------
    const fetchCustomers = () => {
        setCustomers([
            {
                id: 1,
                name: "Budi Santoso",
                email: "budi@gmail.com", // <--- TAMBAHKAN INI
                phone: "081234567890",
                totalOrders: 12
            },
            {
                id: 2,
                name: "Sinta Ayu",
                email: "sinta@yahoo.com", // <--- TAMBAHKAN INI
                phone: "081298765432",
                totalOrders: 5
            },
            {
                id: 3,
                name: "Rizal Firmansyah",
                email: "rizal@outlook.com", // <--- TAMBAHKAN INI
                phone: "081266633344",
                totalOrders: 1
            },
        ]);
    };

    const fetchOrders = () => {
        setOrders([
            { id: 1, customer: "Budi", total: 50000, status: "Selesai" },
            { id: 2, customer: "Sinta", total: 75000, status: "Proses" },
        ]);
    };

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(REVIEWS_API_URL);
            const data = response.data.data ?? response.data;
            setReviews(data);
        } catch (error) {
            console.error("Fetch Reviews Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchOrders();
        fetchReviews();
    }, []);

    // ----------------------------------------------------
    // MODAL HANDLERS
    // ----------------------------------------------------
    const handleOpenAddModal = () => {
        setIsEditing(false);
        setImageFile(null);
        setCurrentMenu({
            id: null,
            product_name: '',
            product_price: '',
            product_description: '',
            product_url_image: null,
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (menu) => {
        setIsEditing(true);
        setImageFile(null);
        setCurrentMenu(menu);
        setIsModalOpen(true);
    };

    const handleOpenReviewDetail = (review) => {
        setSelectedReview(review);
        setIsReviewDetailOpen(true);
    };

    // ----------------------------------------------------
    // SAVE MENU (TANPA BACKEND)
    // ----------------------------------------------------
    const handleSaveMenu = (e) => {
        e.preventDefault();

        // EDIT
        if (isEditing) {
            editMenu(currentMenu.id, {
                name: currentMenu.product_name,
                price: currentMenu.product_price,
                description: currentMenu.product_description,
                image: currentMenu.product_url_image || "",
            });

            alert("Produk berhasil diperbarui!");

            // ADD BARU
        } else {
            addMenu({
                name: currentMenu.product_name,
                price: currentMenu.product_price,
                description: currentMenu.product_description,
                image: currentMenu.product_url_image || "",
            });

            alert("Produk berhasil ditambahkan!");
        }

        setIsModalOpen(false);
    };

    // ----------------------------------------------------
    // DELETE MENU (TANPA BACKEND)
    // ----------------------------------------------------
    const handleDeleteMenuLocal = (id) => {
        deleteMenu(id);
        alert("Produk telah dihapus");
    };

    // ----------------------------------------------------
    // DELETE REVIEW (MASIH API)
    // ----------------------------------------------------
    const handleDeleteReview = async (id) => {
        if (!window.confirm("Yakin ingin menghapus ulasan ini?")) return;

        try {
            await axios.delete(`${REVIEWS_API_URL}/${id}`);
            alert("Ulasan berhasil dihapus");
            fetchReviews();
        } catch (error) {
            console.error("Delete Review Error:", error);
            alert("Gagal menghapus ulasan.");
        }
    };

    // ----------------------------------------------------
    // LOGOUT
    // ----------------------------------------------------
    const handleLogout = () => {
        if (window.confirm("Keluar dari aplikasi?")) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
                isSidebarOpen={isSidebarOpen}
            />

            <div className="flex-1 flex flex-col h-full overflow-hidden">

                <AdminTopbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">

                    {activeTab === 'dashboard' && (
                        <DashboardView
                            menus={menus}
                            reviews={reviews}
                            orders={orders}
                        />
                    )}

                    {activeTab === 'menu' && (
                        <MenuManagerView
                            menus={menus}
                            setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm}
                            isLoading={isLoading}
                            handleOpenAddModal={handleOpenAddModal}
                            handleOpenEditModal={handleOpenEditModal}
                            handleDeleteMenu={handleDeleteMenuLocal}
                        />
                    )}

                    {activeTab === 'reviews' && (
                        <ReviewsView
                            reviews={reviews}
                            isLoading={isLoading}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleDeleteReview={handleDeleteReview}
                            handleOpenReviewDetail={handleOpenReviewDetail}
                        />
                    )}

                    {activeTab === 'orders' && (
                        <OrdersView orders={orders} />
                    )}

                    {activeTab === 'customers' && (
                        <CustomersView customers={customers} />
                    )}
                </main>
            </div>

            <ProductModal
                isModalOpen={isModalOpen}
                isEditing={isEditing}
                setIsModalOpen={setIsModalOpen}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
                setImageFile={setImageFile}
                handleSaveMenu={handleSaveMenu}
            />

            <ReviewDetailModal
                isOpen={isReviewDetailOpen}
                review={selectedReview}
                setIsOpen={setIsReviewDetailOpen}
                handleDeleteReview={handleDeleteReview}
            />
        </div>
    );
};

export default AdminDashboard;
