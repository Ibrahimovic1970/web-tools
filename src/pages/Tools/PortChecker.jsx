import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PortChecker() {
    const [port, setPort] = useState('');
    const [info, setInfo] = useState(null);
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const portDatabase = {
        21: { name: 'FTP', desc: 'File Transfer Protocol' },
        22: { name: 'SSH', desc: 'Secure Shell' },
        23: { name: 'Telnet', desc: 'Remote login' },
        25: { name: 'SMTP', desc: 'Simple Mail Transfer Protocol' },
        53: { name: 'DNS', desc: 'Domain Name System' },
        80: { name: 'HTTP', desc: 'Hypertext Transfer Protocol' },
        110: { name: 'POP3', desc: 'Post Office Protocol v3' },
        143: { name: 'IMAP', desc: 'Internet Message Access Protocol' },
        443: { name: 'HTTPS', desc: 'HTTP Secure' },
        993: { name: 'IMAPS', desc: 'IMAP over SSL' },
        995: { name: 'POP3S', desc: 'POP3 over SSL' },
        3389: { name: 'RDP', desc: 'Remote Desktop Protocol' },
        5900: { name: 'VNC', desc: 'Virtual Network Computing' },
    };

    const checkPort = () => {
        const num = parseInt(port);
        setInfo(portDatabase[num] || { name: 'Unknown', desc: 'Port tidak dikenal' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Port Checker</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Cek informasi port jaringan.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Port</label>
                        <input
                            type="number"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="Contoh: 80"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={checkPort}
                        disabled={!port}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 mb-6"
                    >
                        🔍 Cek Port
                    </button>

                    {info && (
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p><strong>Nama:</strong> {info.name}</p>
                            <p><strong>Deskripsi:</strong> {info.desc}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}