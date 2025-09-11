import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Base64Converter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const convert = () => {
        try {
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch {
            setOutput('Error: Input tidak valid');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Base64 Converter</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Encode atau decode teks ke Base64.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Mode</label>
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="encode">Encode (Teks → Base64)</option>
                            <option value="decode">Decode (Base64 → Teks)</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Input</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Masukkan teks atau Base64..."
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={convert}
                        disabled={!input}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 mb-6"
                    >
                        🔁 Konversi
                    </button>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Output</label>
                        <textarea
                            value={output}
                            readOnly
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}