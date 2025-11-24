import React from 'react';

// Gunakan URL placeholder sementara atau ganti dengan path gambar Anda yang valid
// Jika menggunakan file lokal, pastikan file tersebut ada di folder yang sesuai
import aboutImage1 from '../../assets/ayam-goreng-kremes.jpeg'; // Gambar untuk bagian atas kanan
import aboutImage2 from '../../assets/ayam-kampung-bakar-kecap.jpeg';

const TentangKami = () => {
    return (
        // 1. BACKGROUND: Diubah menjadi Krem Polos (#FFF8F0) sesuai gaya gambar ke-2
        <section className="w-full min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-orange-400 to-orange-600 flex items-center">

            <div className="max-w-6xl mx-auto w-full">

                {/* JUDUL BESAR: TENTANG KAMI */}
                <div className="text-center mb-16">
                    <h2
                        className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-wider"
                        style={{
                            background: 'linear-gradient(to bottom, #D32F2F, #FF8C00)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            WebkitTextStroke: '2px rgba(0,0,0,0.7)',
                            filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.4))'
                        }}
                    >
                        TENTANG KAMI
                    </h2>
                </div>

                {/* --- BLOK KONTEN 1: Teks Kiri, Gambar Kanan --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">

                    {/* KIRI: TEKS */}
                    <div className="text-left order-2 md:order-1">
                        <p className="text-yellow-50 text-lg md:text-xl leading-relaxed mb-6 font-poppins text-justify">
                            AYAM KABOGOR adalah spesialisasi catering yang bangga menyajikan hidangan lezat Ayam Kampung dan Bebek dengan cita rasa otentik yang khas dari Bogor. Kami memprioritaskan kualitas dengan memilih Ayam Kampung yang gurih dan Bebek yang empuk, diolah menggunakan rempah-rempah pilihan yang diracik khusus.
                        </p>
                        <p className="text-yellow-50 text-lg md:text-xl leading-relaxed font-poppins text-justify">
                            Setiap potong Ayam Kampung dipilih dengan cermat untuk memastikan kualitas dan tekstur terbaik. Proses pembakaran dilakukan dengan sempurna, menghasilkan aroma asap yang khas dan daging yang sangat lembut.
                        </p>
                    </div>

                    {/* KANAN: GAMBAR 1 */}
                    {/* PERUBAHAN DISINI: Ditambahkan 'hidden md:flex' agar hilang di HP */}
                    <div className="hidden md:flex justify-center md:justify-end order-1 md:order-2">
                        <div className="relative p-3 border-[3px] border-[#C0400B] rounded-[80px] bg-white shadow-lg">
                            <div className="h-[400px] w-[280px] sm:h-[450px] sm:w-[320px] overflow-hidden rounded-[70px]">
                                <img
                                    src={aboutImage1}
                                    alt="Ayam Goreng Kremes"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- BLOK KONTEN 2: Gambar Kiri, Teks Kanan --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* KIRI: GAMBAR 2 */}
                    {/* PERUBAHAN DISINI: Ditambahkan 'hidden md:flex' agar hilang di HP */}
                    <div className="hidden md:flex justify-center md:justify-start order-1">
                        <div className="relative p-3 border-[3px] border-[#C0400B] rounded-[80px] bg-white shadow-lg">
                            <div className="h-[400px] w-[280px] sm:h-[450px] sm:w-[320px] overflow-hidden rounded-[70px]">
                                <img
                                    src={aboutImage2}
                                    alt="Ayam Bakar Kecap"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* KANAN: TEKS */}
                    <div className="text-left order-2">
                        <p className="text-yellow-50 text-lg md:text-xl leading-relaxed mb-6 font-poppins text-justify">
                            Komitmen kami pada kualitas dapat Anda rasakan salah satunya pada menu Ayam Goreng Kremes kami yang legendaris. Proses pengungkepan yang lama menjamin daging empuk, kemudian digoreng hingga menghasilkan kremesan yang renyah dan gurih. AYAM KABOGOR selalu berdedikasi untuk menghadirkan hidangan terbaik dan menjadi solusi catering terpercaya untuk setiap acara Anda.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default TentangKami;