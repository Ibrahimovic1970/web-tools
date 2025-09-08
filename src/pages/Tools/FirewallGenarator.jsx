import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FirewallGenerator() {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [comment, setComment] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        // Animasi saat halaman muncul
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const generateRule = () => {
        if (!ip) return '';
        let rule = `/ip firewall filter add action=drop src-address=${ip}`;
        if (port) rule += ` dst-port=${port}`;
        if (comment) rule += ` comment="${comment}"`;
        return rule;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateRule());
        alert('Rule disalin!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Firewall Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Block IP atau port dengan cepat.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">IP Target</label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="Contoh: 192.168.1.10"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Port (opsional)</label>
                        <input
                            type="number"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="Contoh: 80"
                            min="1"
                            max="65535"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Komentar (opsional)</label>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Contoh: Malware"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={copyToClipboard}
                            disabled={!ip}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                        >
                            📋 Salin Rule
                        </button>
                    </div>

                    {generateRule() && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p><strong>Rule MikroTik:</strong></p>
                            <pre className="mt-2 bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                                {generateRule()}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}