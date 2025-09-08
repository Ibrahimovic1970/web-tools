import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PortChecker() {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [result, setResult] = useState(null);
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const checkPort = () => {
        if (!ip || !port) return;
        // Simulasi hasil
        setResult({
            status: Math.random() > 0.5 ? 'open' : 'closed',
            service: 'HTTP',
            version: 'Apache 2.4'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Port Checker</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Cek informasi port jaringan.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">IP Address</label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="Contoh: 192.168.1.1"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Port</label>
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

                    <button
                        onClick={checkPort}
                        disabled={!ip || !port}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                    >
                        🔍 Cek Port
                    </button>

                    {result && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p><strong>Status:</strong> {result.status === 'open' ? '🟢 Terbuka' : '🔴 Tertutup'}</p>
                            <p><strong>Service:</strong> {result.service}</p>
                            <p><strong>Version:</strong> {result.version}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}