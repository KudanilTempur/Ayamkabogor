import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X, Save, User, Mail, Phone, MapPin, Lock, Shield } from 'lucide-react';
import axios from 'axios';

const CUSTOMERS_API_URL = "http://127.0.0.1:8000/api/customers";

const CustomersView = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Form data
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        address: '',
        no_telp: '',
        password: '',
        is_admin: false
    });

    // Fetch customers dari backend
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(CUSTOMERS_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data.data || response.data;
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter customers
    const filteredCustomers = customers.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.no_telp?.includes(searchTerm)
    );

    // Open Add Modal
    const handleOpenAddModal = () => {
        setIsEditing(false);
        setFormData({
            id: null,
            name: '',
            email: '',
            address: '',
            no_telp: '',
            password: '',
            is_admin: false
        });
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleOpenEditModal = (customer) => {
        setIsEditing(true);
        setFormData({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            address: customer.address || '',
            no_telp: customer.no_telp || '',
            password: '',
            is_admin: customer.is_admin || false
        });
        setIsModalOpen(true);
    };

    // Open Detail Modal
    const handleOpenDetail = (customer) => {
        setSelectedCustomer(customer);
        setIsDetailOpen(true);
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Save customer
    const handleSaveCustomer = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const payload = {
                name: formData.name,
                email: formData.email,
                address: formData.address,
                no_telp: formData.no_telp,
                is_admin: formData.is_admin ? 1 : 0
            };

            if (formData.password) {
                payload.password = formData.password;
            }

            if (isEditing) {
                await axios.put(`${CUSTOMERS_API_URL}/${formData.id}`, payload, config);
                alert('✅ Data pelanggan berhasil diperbarui!');
            } else {
                payload.password = formData.password;
                await axios.post(CUSTOMERS_API_URL, payload, config);
                alert('✅ Pelanggan baru berhasil ditambahkan!');
            }

            fetchCustomers();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Save customer error:', error);
            const errorMsg = error.response?.data?.message || 'Gagal menyimpan data pelanggan';
            alert('❌ ' + errorMsg);
        }
    };

    // Delete customer
    const handleDeleteCustomer = async (id) => {
        if (!window.confirm('Yakin ingin menghapus pelanggan ini?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${CUSTOMERS_API_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('✅ Pelanggan berhasil dihapus');
            fetchCustomers();
        } catch (error) {
            console.error('Delete customer error:', error);
            alert('❌ Gagal menghapus pelanggan');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header - Sesuai UI Reference */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Daftar Pelanggan ({customers.length})
                </h2>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md"
                >
                    <Plus size={18} /> Tambah Pelanggan
                </button>
            </div>

            {/* Card Container - Sesuai UI Reference */}
            <div className="bg-white rounded-lg shadow">

                {/* Search Bar */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau nomor telepon..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No. Telepon</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">
                                        Memuat data...
                                    </td>
                                </tr>
                            ) : filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-800">{customer.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{customer.no_telp || '-'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {customer.is_admin ? (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                    Customer
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                    onClick={() => handleOpenEditModal(customer)}
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        Tidak ada data pelanggan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Add/Edit - Sesuai UI Reference Image 2 */}
            {isModalOpen && (
                <>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)}></div>

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                            {/* Header */}
                            <div className="relative p-6 border-b">
                                <h3 className="text-xl font-bold text-gray-900 text-center">
                                    {isEditing ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSaveCustomer} className="p-6">
                                <div className="space-y-5">

                                    {/* Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* No Telepon */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. Telepon
                                        </label>
                                        <input
                                            type="text"
                                            name="no_telp"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={formData.no_telp}
                                            onChange={handleChange}
                                            placeholder="08123456789"
                                        />
                                    </div>

                                    {/* Alamat */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat
                                        </label>
                                        <textarea
                                            name="address"
                                            rows="3"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder={isEditing ? "Kosongkan jika tidak ingin mengubah" : "Minimal 6 karakter"}
                                            required={!isEditing}
                                        />
                                        {isEditing && (
                                            <p className="text-xs text-gray-500 mt-1.5">
                                                * Kosongkan jika tidak ingin mengubah password
                                            </p>
                                        )}
                                    </div>

                                    {/* Is Admin Checkbox */}
                                    <div className="flex items-center gap-2 pt-2">
                                        <input
                                            type="checkbox"
                                            name="is_admin"
                                            id="is_admin"
                                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                            checked={formData.is_admin}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="is_admin" className="text-sm font-medium text-gray-700 cursor-pointer">
                                            Jadikan sebagai Admin
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons - Sesuai UI Reference */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium shadow-sm transition"
                                    >
                                        {isEditing ? 'Simpan Perubahan' : 'Tambah Pelanggan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomersView;