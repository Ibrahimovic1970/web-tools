// ✅ PENTING: Tambahkan ini di baris pertama
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import html2canvas from 'html2canvas';

export default function KartuPelajarGenerator() {
    const [nama, setNama] = useState('');
    const [nis, setNis] = useState('');
    const [kelas, setKelas] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [foto, setFoto] = useState(null);
    const [qrCode, setQrCode] = useState('');
    const containerRef = useRef();
    const cardRef = useRef();

    // Animasi saat muncul
    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setFoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const generateQrCode = () => {
        const data = `NAMA: ${nama}, NIS: ${nis}, KELAS: ${kelas}, JURUSAN: ${jurusan}`;
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data)}`);
    };

    const downloadKartu = () => {
        const card = cardRef.current;
        html2canvas(card, { backgroundColor: null, scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = imgData;
            a.download = `kartu-pelajar-${nama}.png`;
            a.click();
        });
    };

    useEffect(() => {
        if (nama && nis && kelas && jurusan) {
            generateQrCode();
        }
    }, [nama, nis, kelas, jurusan]);

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-center">Generator Kartu Pelajar</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat kartu pelajar digital dengan cepat.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Input */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Contoh: Ahmad Ibrahimovic"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">NIS</label>
                                <input
                                    type="text"
                                    value={nis}
                                    onChange={(e) => setNis(e.target.value)}
                                    placeholder="Contoh: 1234567890"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kelas</label>
                                <input
                                    type="text"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    placeholder="Contoh: XII SIJA"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Jurusan</label>
                                <input
                                    type="text"
                                    value={jurusan}
                                    onChange={(e) => setJurusan(e.target.value)}
                                    placeholder="Contoh: Sistem Informatika Jaringan dan Aplikasi"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Foto</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <button
                                onClick={downloadKartu}
                                disabled={!nama || !nis || !kelas || !jurusan}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
                            >
                                📥 Download Kartu
                            </button>
                        </div>

                        {/* Preview Kartu */}
                        <div className="flex justify-center">
                            <div
                                ref={cardRef}
                                className="w-80 h-112 bg-white border-2 border-gray-300 rounded-lg shadow-lg relative overflow-hidden"
                                style={{ aspectRatio: '3/4' }}
                            >
                                {/* Header */}
                                <div className="bg-blue-600 text-white p-4 text-center">
                                    <h3 className="font-bold text-lg">KARTU PELAJAR</h3>
                                    <p className="text-sm">SMK NEGERI 1 TEKNOLOGI INFORMATIKA</p>
                                </div>

                                {/* Foto */}
                                <div className="flex justify-center mt-6">
                                    <div className="w-24 h-24 border-2 border-gray-300 rounded-full overflow-hidden">
                                        {foto ? (
                                            <img src={foto} alt="Foto Pelajar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                                Foto
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Data */}
                                <div className="px-6 mt-6 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Nama:</span>
                                        <span>{nama || 'Ahmad Ibrahimovic'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">NIS:</span>
                                        <span>{nis || '1234567890'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Kelas:</span>
                                        <span>{kelas || 'XII SIJA'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Jurusan:</span>
                                        <span className="text-sm">{jurusan || 'Sistem Informatika Jaringan dan Aplikasi'}</span>
                                    </div>
                                </div>

                                {/* QR Code */}
                                <div className="absolute bottom-6 right-6 w-16 h-16">
                                    {qrCode ? (
                                        <img src={qrCode} alt="QR Code" className="w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                            QR
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2 text-xs">
                                    Berlaku Hingga 2025
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}