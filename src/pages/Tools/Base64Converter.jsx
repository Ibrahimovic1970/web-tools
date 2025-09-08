import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Base64Converter() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        // Animasi saat halaman muncul
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const encode = () => {
        if (!text) return;
        setResult(btoa(text));
    };

    const decode = () => {
        if (!result) return;
        try {
            setText(atob(result));
        } catch (e) {
            alert("Invalid Base64");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Base64 Converter</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Encode/decode teks ke Base64.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Teks</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows="3"
                            placeholder="Masukkan teks..."
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={encode}
                            disabled={!text}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                        >
                            📤 Encode
                        </button>
                        <button
                            onClick={decode}
                            disabled={!result}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                        >
                            📥 Decode
                        </button>
                    </div>

                    {result && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p><strong>Hasil:</strong></p>
                            <pre className="mt-2 bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                                {result}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}