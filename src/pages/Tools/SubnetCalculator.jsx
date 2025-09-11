import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SubnetCalculator() {
    const [ip, setIp] = useState('192.168.1.0');
    const [cidr, setCidr] = useState(24);
    const [result, setResult] = useState(null);
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const calculate = () => {
        if (!ip || cidr < 0 || cidr > 32) return;

        const ipParts = ip.split('.').map(Number);
        const mask = ~((1 << (32 - cidr)) - 1);
        const network = ipParts[0] << 24 | ipParts[1] << 16 | ipParts[2] << 8 | ipParts[3];
        const netId = network & mask;
        const broadcast = netId | ~mask;
        const first = netId + 1;
        const last = broadcast - 1;
        const totalHosts = Math.max(0, (1 << (32 - cidr)) - 2);

        setResult({
            network: [(netId >> 24) & 255, (netId >> 16) & 255, (netId >> 8) & 255, netId & 255].join('.'),
            broadcast: [(broadcast >> 24) & 255, (broadcast >> 16) & 255, (broadcast >> 8) & 255, broadcast & 255].join('.'),
            first: [(first >> 24) & 255, (first >> 16) & 255, (first >> 8) & 255, first & 255].join('.'),
            last: [(last >> 24) & 255, (last >> 16) & 255, (last >> 8) & 255, last & 255].join('.'),
            subnetMask: [(mask >> 24) & 255, (mask >> 16) & 255, (mask >> 8) & 255, mask & 255].join('.'),
            totalHosts
        });
    };

    useEffect(() => {
        calculate();
    }, [ip, cidr]);

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Subnet Calculator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Hitung network, broadcast, dan jumlah host.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">IP Address</label>
                            <input
                                type="text"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                placeholder="192.168.1.0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">CIDR (/)</label>
                            <input
                                type="number"
                                min="0"
                                max="32"
                                value={cidr}
                                onChange={(e) => setCidr(parseInt(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {result && (
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="font-semibold mb-2">Hasil Subnetting</h3>
                            <ul className="space-y-1 text-sm">
                                <li><strong>Network ID:</strong> {result.network}</li>
                                <li><strong>Subnet Mask:</strong> {result.subnetMask}</li>
                                <li><strong>First Host:</strong> {result.first}</li>
                                <li><strong>Last Host:</strong> {result.last}</li>
                                <li><strong>Broadcast:</strong> {result.broadcast}</li>
                                <li><strong>Total Hosts:</strong> {result.totalHosts}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}