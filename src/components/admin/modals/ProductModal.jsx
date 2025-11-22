import React from "react";
import { X } from "lucide-react";

export default function ProductModal({
    isModalOpen,
    isEditing,
    currentMenu,
    setCurrentMenu,
    handleSaveMenu,
    setIsModalOpen
}) {

    if (!isModalOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentMenu((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md relative">

                {/* Close Button */}
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                    onClick={() => setIsModalOpen(false)}
                >
                    <X />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold mb-4">
                    {isEditing ? "Edit Produk" : "Tambah Produk"}
                </h2>

                <form
                    onSubmit={handleSaveMenu}
                    className="space-y-4"
                >
                    {/* Product Name */}
                    <div>
                        <label className="text-sm text-gray-500">Nama Produk</label>
                        <input
                            type="text"
                            name="product_name"
                            value={currentMenu.product_name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-gray-500">Deskripsi</label>
                        <textarea
                            name="product_description"
                            value={currentMenu.product_description}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 h-20 resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm text-gray-500">Harga</label>
                        <input
                            type="number"
                            name="product_price"
                            value={currentMenu.product_price}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            min="0"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="text-sm text-gray-500">URL Gambar</label>
                        <input
                            type="text"
                            name="product_url_image"
                            value={currentMenu.product_url_image}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="https://contoh.com/gambar.jpg"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                            {isEditing ? "Simpan Perubahan" : "Tambah Produk"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
