import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeGenerator() {
    const [text, setText] = useState('https://nettool.id');
    const [size, setSize] = useState(200);
    const containerRef = useRef();

    useEffect(() => {
        // Animasi saat halaman muncul
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        // Animasi QR Code saat berubah
        gsap.fromTo('canvas',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, delay: 0.2 }
        );
    }, [text, size]);

    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode-nettool.png';
            downloadLink.click();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">QR Code Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat QR Code untuk link, teks, WiFi, atau konfigurasi jaringan.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Teks atau URL</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows="3"
                            placeholder="Masukkan teks, URL, atau WiFi:WIFI:S:MyNet;T:WPA;P:mypass;;"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Ukuran: {size}px</label>
                        <input
                            type="range"
                            min="100"
                            max="300"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-center mb-6 p-4 bg-white border rounded-lg">
                        <QRCodeCanvas value={text} size={size} level="H" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDownload}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            📥 Unduh QR Code
                        </button>
                        <button
                            onClick={() => setText('')}
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