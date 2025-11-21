import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REVIEWS_API_URL = "http://127.0.0.1:8000/api/reviews";
const PRODUCTS_API_URL = "http://127.0.0.1:8000/api/products";

const TulisUlasan = () => {
    const navigate = useNavigate();

    // State untuk menyimpan nilai input
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // State untuk daftar produk
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    // State untuk data form
    const [formData, setFormData] = useState({
        productName: '',
        reviewText: ''
    });

    // ✅ CHECK LOGIN STATUS (tidak redirect)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert ke boolean
    }, []);

    // Fetch daftar produk saat component mount
    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
        }
    }, [isLoggedIn]);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const response = await axios.get(PRODUCTS_API_URL);
            const data = response.data.data ? response.data.data : response.data;
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Gagal memuat daftar produk. Silakan refresh halaman.');
        } finally {
            setIsLoadingProducts(false);
        }
    };

    // Handle perubahan input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit ke backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi rating
        if (rating === 0) {
            alert('Silakan pilih rating bintang terlebih dahulu!');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Ambil token untuk authentication
            const token = localStorage.getItem('token');

            // Kirim data ke backend
            const response = await axios.post(REVIEWS_API_URL, {
                product_name: formData.productName,
                rating: rating,
                review_text: formData.reviewText
            }, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });

            // Jika berhasil
            setSubmitStatus('success');

            // Reset form
            setFormData({
                productName: '',
                reviewText: ''
            });
            setRating(0);

            // Tampilkan notifikasi sukses
            alert('Terima kasih! Ulasan Anda berhasil dikirim.');

        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmitStatus('error');

            // Handle error 401 (Unauthorized)
            if (error.response?.status === 401) {
                alert('Sesi berakhir. Silakan login kembali.');
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            // Tampilkan error message
            const errorMsg = error.response?.data?.message || 'Gagal mengirim ulasan. Silakan coba lagi.';
            alert(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full py-16 px-4 flex justify-center items-center bg-[#9A3412]">
            <div className="w-full max-w-3xl">

                {/* JUDUL HEADER */}
                <div className="text-center mb-8">
                    <h2
                        className="text-4xl md:text-5xl font-black italic tracking-wider uppercase"
                        style={{
                            background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))'
                        }}
                    >
                        TULIS ULASAN ANDA!
                    </h2>
                </div>

                {/* FORM CONTAINER */}
                <div className="border-2 border-white/40 rounded-3xl p-6 md:p-10 bg-white/5 backdrop-blur-sm">

                    {/* ✅ Jika belum login, tampilkan pesan */}
                    {!isLoggedIn ? (
                        <div className="text-center py-16 space-y-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                Silakan Login Terlebih Dahulu
                            </h3>
                            <p className="text-white/80 text-lg">
                                Anda harus login untuk dapat menulis ulasan produk kami
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform transition hover:scale-105 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Login Sekarang
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-xl border-2 border-white/50 transition hover:scale-105"
                                >
                                    Belum punya akun? Daftar
                                </button>
                            </div>
                        </div>
                    ) : (
                        // ✅ Form muncul jika sudah login
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Dropdown: Pilih Produk */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-bold text-lg md:text-xl ml-1 drop-shadow-md">
                                    Pilih Produk Yang Dibeli
                                </label>

                                {isLoadingProducts ? (
                                    <div className="w-full p-4 rounded-xl bg-white/80 text-center text-gray-500 shadow-lg border-2 border-white/50">
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memuat daftar produk...
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full p-4 pr-12 rounded-xl bg-white/90 border-2 border-white/50 outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 text-gray-800 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none transition-all duration-200 hover:bg-white hover:shadow-xl"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23C2410C' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 12px center',
                                                backgroundSize: '24px'
                                            }}
                                        >
                                            <option value="" disabled>-- Pilih Produk Yang Anda Beli --</option>
                                            {products.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.product_name}
                                                    className="py-2 font-medium"
                                                >
                                                    {product.product_name} • Rp {parseInt(product.product_price || 0).toLocaleString('id-ID')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {products.length === 0 && !isLoadingProducts && (
                                    <div className="bg-red-500/20 border-2 border-red-400/50 text-white p-3 rounded-lg text-center">
                                        <p className="font-semibold">⚠️ Tidak ada produk tersedia saat ini</p>
                                    </div>
                                )}
                            </div>

                            {/* Input: Nilai Produk (Bintang) */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-bold text-lg md:text-xl ml-1 drop-shadow-md">
                                    Nilai Produk
                                </label>
                                <div className="flex gap-2 items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <label key={index} className="cursor-pointer transform transition hover:scale-125 active:scale-95">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={starValue}
                                                    onClick={() => setRating(starValue)}
                                                    disabled={isSubmitting}
                                                    className="hidden"
                                                />
                                                <FaStar
                                                    size={36}
                                                    className={`transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'drop-shadow-lg'}`}
                                                    color={starValue <= (hover || rating) ? "#FFD700" : "#E5E7EB80"}
                                                    onMouseEnter={() => !isSubmitting && setHover(starValue)}
                                                    onMouseLeave={() => setHover(0)}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                                {rating > 0 && (
                                    <p className="text-sm text-yellow-300 font-semibold ml-1 flex items-center gap-2 animate-pulse">
                                        <FaStar size={16} className="text-yellow-400" />
                                        Rating yang dipilih: {rating} bintang
                                    </p>
                                )}
                            </div>

                            {/* Input: Tulis Ulasan */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-bold text-lg md:text-xl ml-1 drop-shadow-md">
                                    Tulis Ulasan Anda
                                </label>
                                <textarea
                                    name="reviewText"
                                    rows="5"
                                    placeholder="Bagikan pengalaman Anda tentang produk kami..."
                                    value={formData.reviewText}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full p-4 rounded-xl bg-white/90 border-2 border-white/50 outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 placeholder-gray-500 text-gray-800 font-medium shadow-lg resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-white hover:shadow-xl"
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {submitStatus === 'success' && (
                                <div className="bg-green-500/20 border border-green-500/40 text-white p-3 rounded-lg text-center animate-pulse">
                                    ✓ Ulasan berhasil dikirim! Terima kasih atas feedback Anda.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-500/20 border border-red-500/40 text-white p-3 rounded-lg text-center">
                                    ✗ Gagal mengirim ulasan. Silakan coba lagi.
                                </div>
                            )}

                            {/* Tombol Submit */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || products.length === 0}
                                    className="bg-gradient-to-r from-[#C2410C] to-[#ea580c] hover:from-[#ea580c] hover:to-[#f97316] text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg min-w-[250px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mengirim Ulasan...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Kirim Ulasan Saya
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TulisUlasan;