import React from "react";
import { Search, AlertCircle, Eye, Trash } from "lucide-react";

export default function ReviewsView({
    reviews,
    searchTerm,
    setSearchTerm,
    isLoading,
    handleDeleteReview,
    handleOpenReviewDetail
}) {
    const filteredReviews = reviews?.filter(r =>
        r.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.review_text?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const averageRating =
        reviews?.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Ulasan Pelanggan ({reviews?.length || 0})
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Rating Rata-rata:
                        <span className="font-bold text-yellow-500">
                            {" "}{averageRating} ★
                        </span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari ulasan..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600 min-w-[700px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Produk</th>
                                <th className="px-6 py-3">Rating</th>
                                <th className="px-6 py-3 w-1/3">Ulasan</th>
                                <th className="px-6 py-3">Tanggal</th>
                                <th className="px-6 py-3 text-center w-32">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : filteredReviews?.length > 0 ? (
                                filteredReviews.map(review => (
                                    <tr key={review.id} className="hover:bg-purple-50/50">
                                        <td className="px-6 py-4 font-medium">{review.product_name}</td>
                                        <td className="px-6 py-4">{review.rating} / 5</td>
                                        <td className="px-6 py-4 line-clamp-2">{review.review_text}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(review.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center gap-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => handleOpenReviewDetail(review)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => handleDeleteReview(review.id)}
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        <AlertCircle size={32} className="mx-auto mb-2" />
                                        Tidak ada ulasan ditemukan
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
