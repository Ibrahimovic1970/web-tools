import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export default function Home() {
    const heroRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        // Animasi hero
        gsap.fromTo(heroRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        // Animasi konten
        gsap.fromTo(contentRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
        );
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 text-center relative overflow-hidden">
                <div
                    ref={heroRef}
                    className="max-w-5xl mx-auto px-6 relative z-10"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                        Selamat Datang di <span className="text-blue-600">BazmaTools</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Kumpulan tools praktis untuk teknisi jaringan, siswa SMK, dan pelajar Indonesia.
                        Buat tugas, konfigurasi jaringan, dan dokumen sekolah dengan cepat dan mudah.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link
                            to="/tools"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
                        >
                            🛠️ Lihat Semua Tools
                        </Link>
                        <Link
                            to="/tools/surat-izin"
                            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
                        >
                            🖨️ Coba Surat Izin
                        </Link>
                    </div>
                </div>
                {/* Background Logo Halus */}
                <div className="absolute inset-0 bg-[url('/pages/assets/LogoUtama.png')] opacity-5 bg-contain bg-center bg-no-repeat pointer-events-none"></div>
            </div>

            {/* Fitur Utama */}
            <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Fitur Unggulan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🎓</div>
                        <h3 className="text-xl font-semibold mb-2">Untuk Sekolah</h3>
                        <p className="text-gray-600">
                            Generator surat izin, kartu pelajar, jadwal pelajaran, dan tanda tangan digital.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🔧</div>
                        <h3 className="text-xl font-semibold mb-2">Untuk Teknisi</h3>
                        <p className="text-gray-600">
                            Subnet calculator, firewall generator, MikroTik script, dan port checker.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📱</div>
                        <h3 className="text-xl font-semibold mb-2">Untuk Anak Muda</h3>
                        <p className="text-gray-600">
                            QR Code, password generator, base64 converter, dan tools kreatif lainnya.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Siap mulai menggunakan?</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Semua tools gratis, cepat, dan bisa digunakan langsung di browser.
                    </p>
                    <Link
                        to="/tools"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                        🔍 Jelajahi Tools
                    </Link>
                </div>
            </div>
        </div>
    );
}