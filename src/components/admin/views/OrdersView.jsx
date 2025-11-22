import React, { useState, useEffect } from "react";
import {
    Search, Plus, Edit, Trash2, X, Save,
    AlertCircle, Image as ImageIcon
} from "lucide-react";

export default function ProductManagement({ initialData }) {
    // --- 1. STATE ---
    // Menggunakan data dummy jika initialData kosong
    const [products, setProducts] = useState(initialData || [
        { id: 1, name: "Ayam Bakar Madu", description: "Ayam bakar dengan bumbu madu spesial.", price: 25000, image: "" },
        { id: 2, name: "Ayam Goreng Serundeng", description: "Ayam goreng gurih dengan taburan serundeng.", price: 22000, image: "" },
    ]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // State Form disesuaikan dengan Gambar (Nama, Deskripsi, Harga, Gambar)
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        image: ""
    });

    // --- 2. EFFECT ---
    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description.toLowerCase().includes(lowerTerm)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // --- 3. HANDLERS ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddNew = () => {
        setFormData({ id: null, name: "", description: "", price: "", image: "" });
        setIsEditing(false);
        setIsFormOpen(true);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus produk ini?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, price: Number(formData.price) };

        if (isEditing) {
            setProducts(prev => prev.map(p => p.id === payload.id ? payload : p));
        } else {
            const newProduct = { ...payload, id: Date.now() };
            setProducts(prev => [...prev, newProduct]);
        }
        setIsFormOpen(false);
    };

    // --- 4. UI RENDER ---
    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">

            {/* HEADER HALAMAN */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Daftar Produk ({products.length})
                </h2>
                <button
                    onClick={handleAddNew}
                    className="bg-orange-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-orange-800 transition shadow-sm font-medium"
                >
                    <Plus size={18} /> Tambah Produk
                </button>
            </div>

            {/* --- MODAL POPUP FORM (Sesuai Gambar) --- */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay Gelap */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFormOpen(false)}
                    ></div>

                    {/* Kotak Modal */}
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Header Modal */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 text-center flex-1">
                                {isEditing ? "Edit Produk" : "Tambah Produk"}
                            </h3>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition absolute right-5"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            {/* Nama Produk */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nama Produk</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* Deskripsi (Textarea) */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm resize-none"
                                    placeholder=""
                                ></textarea>
                            </div>

                            {/* Harga */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Harga</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* URL Gambar */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">URL Gambar</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm text-gray-500"
                                    placeholder="https://contoh.com/gambar.jpg"
                                />
                            </div>

                            {/* Footer Tombol (Jarak agak jauh dari input terakhir sesuai gambar) */}
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                                >
                                    {isEditing ? "Simpan Perubahan" : "Tambah Produk"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SEARCH BAR & TABEL (Konteks Halaman Utama) */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50/50">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama produk..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 w-16">Gambar</th>
                                <th className="px-6 py-3">Nama Produk & Deskripsi</th>
                                <th className="px-6 py-3">Harga</th>
                                <th className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center text-orange-600">
                                                {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover rounded" /> : <ImageIcon size={20} />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{item.name}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{item.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"><Edit size={16} /></button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle size={24} className="text-gray-300" />
                                            <span>Tidak ada produk ditemukan</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}