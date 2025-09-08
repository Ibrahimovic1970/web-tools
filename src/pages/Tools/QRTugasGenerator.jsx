import { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { gsap } from 'gsap';

export default function QRTugasGenerator() {
    const [link, setLink] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode-tugas.png';
            downloadLink.click();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">QR Code Tugas</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Siswa kumpulkan tugas dengan scan QR.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Link Tugas (Google Drive, Classroom, dll)</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Contoh: https://drive.google.com/file/d/12345"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-center mb-6 p-4 bg-white border rounded-lg">
                        {link ? (
                            <QRCodeCanvas value={link} size={200} level="H" />
                        ) : (
                            <div className="text-gray-500 text-center">Masukkan link tugas</div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDownload}
                            disabled={!link}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                        >
                            📥 Unduh QR Code
                        </button>
                        <button
                            onClick={() => setLink('')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
                        >
                            Bersihkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}