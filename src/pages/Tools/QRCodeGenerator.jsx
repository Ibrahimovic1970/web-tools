import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function QRCodeGenerator() {
    const [text, setText] = useState('');
    const [size, setSize] = useState(200);
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const qrCodeUrl = text ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}` : '';

    const downloadQR = () => {
        if (!qrCodeUrl) return;
        const a = document.createElement('a');
        a.href = qrCodeUrl;
        a.download = 'qrcode.png';
        a.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">QR Code Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat QR Code untuk URL, teks, atau WiFi.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Teks / URL</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Masukkan teks atau URL..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Ukuran: {size}px</label>
                        <input
                            type="range"
                            min="100"
                            max="400"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {qrCodeUrl && (
                        <div className="flex flex-col items-center mb-6">
                            <img src={qrCodeUrl} alt="QR Code" className="border border-gray-300 p-2" />
                            <button
                                onClick={downloadQR}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                📥 Download QR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}