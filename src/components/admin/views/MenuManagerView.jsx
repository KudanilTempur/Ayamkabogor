import React from "react";
import { Search, Plus, Edit, Trash2, AlertCircle } from "lucide-react";

export default function MenuManagerView({
    menus,
    searchTerm,
    setSearchTerm,
    handleOpenAddModal,
    handleOpenEditModal,
    handleDeleteMenu,
    isLoading
}) {

    const filteredMenus = menus?.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Daftar Produk ({menus?.length || 0})
                </h2>

                <button
                    onClick={handleOpenAddModal}
                    className="bg-orange-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition"
                >
                    <Plus size={18} /> Tambah Produk
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari nama produk..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 min-w-[700px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 w-20">Gambar</th>
                                <th className="px-6 py-3">Nama Produk</th>
                                <th className="px-6 py-3 w-1/3">Deskripsi</th>
                                <th className="px-6 py-3">Harga</th>
                                <th className="px-6 py-3 text-center w-32">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">

                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredMenus?.length > 0 ? (
                                filteredMenus.map((item) => (
                                    <tr key={item.id} className="hover:bg-orange-50/50">
                                        <td className="px-6 py-4">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded object-cover border"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                    No Img
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 font-medium">{item.name}</td>
                                        <td className="px-6 py-4">{item.description}</td>

                                        <td className="px-6 py-4 font-semibold">
                                            Rp {parseInt(item.price || 0).toLocaleString("id-ID")}
                                        </td>

                                        <td className="px-6 py-4 flex justify-center gap-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => handleOpenEditModal(item)}
                                            >
                                                <Edit size={18} />
                                            </button>

                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => handleDeleteMenu(item.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        <AlertCircle size={32} className="mx-auto mb-2" />
                                        Tidak ada produk ditemukan
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
