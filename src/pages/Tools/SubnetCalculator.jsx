import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SubnetCalculator() {
    const [ip, setIp] = useState('');
    const [cidr, setCidr] = useState('');
    const [result, setResult] = useState(null);
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const calculateSubnet = () => {
        if (!ip || !cidr) return;

        const ipParts = ip.split('.').map(Number);
        const mask = ~((1 << (32 - cidr)) - 1) >>> 0;
        const subnetMask = [(mask >> 24) & 255, (mask >> 16) & 255, (mask >> 8) & 255, mask & 255].join('.');

        const network = ipParts.map((octet, i) => octet & ((mask >> (24 - i * 8)) & 255)).join('.');
        const firstHost = network.replace(/[^.]*$/, '1');
        const lastHost = (function () {
            const parts = network.split('.').map(Number);
            let count = 32 - cidr;
            let inc = 1;
            while (count >= 8) {
                count -= 8;
                inc *= 256;
            }
            parts[3] += inc - 1;
            for (let i = 3; i > 0; i--) {
                if (parts[i] > 255) {
                    parts[i] = 0;
                    parts[i - 1]++;
                }
            }
            return parts.join('.');
        })();
        const broadcast = lastHost.replace(/[^.]*$/, '255');

        setResult({ subnetMask, network, firstHost, lastHost, broadcast });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Subnet Calculator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Hitung network, broadcast, dan jumlah host.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="IP Address (contoh: 192.168.1.1)"
                            className="p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="number"
                            value={cidr}
                            onChange={(e) => setCidr(e.target.value)}
                            placeholder="CIDR (contoh: 24)"
                            min="0"
                            max="32"
                            className="p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button
                        onClick={calculateSubnet}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-6"
                    >
                        📐 Hitung
                    </button>

                    {result && (
                        <div className="bg-gray-50 p-4 rounded-lg text-sm">
                            <p><strong>Subnet Mask:</strong> {result.subnetMask}</p>
                            <p><strong>Network:</strong> {result.network}</p>
                            <p><strong>First Host:</strong> {result.firstHost}</p>
                            <p><strong>Last Host:</strong> {result.lastHost}</p>
                            <p><strong>Broadcast:</strong> {result.broadcast}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}