import React from "react";
import { X } from "lucide-react";

export default function ReviewDetailModal({ isOpen, review, close }) {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md relative">

                {/* Close Button */}
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                    onClick={close}
                >
                    <X />
                </button>

                <h2 className="text-xl font-bold mb-4">Detail Ulasan</h2>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Nama Produk</p>
                        <p className="font-medium">{review.product_name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="font-medium">{review.rating} / 5</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Ulasan</p>
                        <p>{review.review_text}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Tanggal</p>
                        <p className="text-gray-600">
                            {new Date(review.created_at).toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={close}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
