import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const TulisUlasan = () => {
    // State untuk menyimpan nilai input
    const [rating, setRating] = useState(0); // Nilai bintang yang dipilih (klik)
    const [hover, setHover] = useState(0);   // Nilai bintang saat kursor lewat (hover)

    // State untuk data form lainnya
    const [formData, setFormData] = useState({
        productName: '',
        reviewText: ''
    });

    // Handle perubahan input text
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit (sementara hanya alert)
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Terima kasih! \nProduk: ${formData.productName}\nRating: ${rating} Bintang\nUlasan: ${formData.reviewText}`);
    };

    return (
        // Background Gelap/Oranye Tua Bertekstur (Sesuai Gambar)
        <section className="w-full py-16 px-4 flex justify-center items-center bg-[#9A3412]">

            <div className="w-full max-w-3xl">

                {/* 1. JUDUL HEADER */}
                <div className="text-center mb-8">
                    <h2
                        className="text-4xl md:text-5xl font-black italic tracking-wider uppercase"
                        style={{
                            // Gradient Text Kuning-Oranye
                            background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Outline/Stroke Gelap agar tulisan timbul
                            filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))'
                        }}
                    >
                        TULIS ULASAN ANDA!
                    </h2>
                </div>

                {/* 2. FORM CONTAINER (KOTAK GARIS PUTIH) */}
                <div className="border-2 border-white/40 rounded-3xl p-6 md:p-10 bg-white/5 backdrop-blur-sm">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Input: Produk Yang Dibeli */}
                        <div className="flex flex-col gap-2">
                            <label className="text-black/80 font-bold text-lg md:text-xl ml-1 mix-blend-screen">
                                Produk Yang Dibeli
                            </label>
                            <input
                                type="text"
                                name="productName"
                                placeholder="Nama Produk Yang Dibeli..."
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-white/70 border-none outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 font-medium shadow-inner"
                            />
                        </div>

                        {/* Input: Nilai Produk (Bintang Interaktif) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-black/80 font-bold text-lg md:text-xl ml-1 mix-blend-screen">
                                Nilai Produk
                            </label>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <label key={index} className="cursor-pointer transform transition hover:scale-110">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={starValue}
                                                onClick={() => setRating(starValue)}
                                                className="hidden"
                                            />
                                            <FaStar
                                                size={32}
                                                className="transition-colors duration-200"
                                                color={starValue <= (hover || rating) ? "#FFD700" : "#E5E7EB80"} // Kuning jika aktif, Abu transparan jika tidak
                                                onMouseEnter={() => setHover(starValue)}
                                                onMouseLeave={() => setHover(0)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Input: Tulis Ulasan */}
                        <div className="flex flex-col gap-2">
                            <label className="text-black/80 font-bold text-lg md:text-xl ml-1 mix-blend-screen">
                                Tulis Ulasan Anda
                            </label>
                            <textarea
                                name="reviewText"
                                rows="5"
                                placeholder="Bagikan ulasan anda tentang produk kami"
                                value={formData.reviewText}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-white/70 border-none outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 font-medium shadow-inner resize-none"
                            ></textarea>
                        </div>

                        {/* Tombol Submit */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="bg-[#C2410C] hover:bg-[#ea580c] text-white font-bold py-3 px-8 rounded-xl shadow-lg transform transition hover:scale-105 border border-white/20"
                            >
                                Submit Ulasan Anda
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </section>
    );
};

export default TulisUlasan;