import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MikroTikScriptGenerator() {
    const [queueName, setQueueName] = useState('Download');
    const [target, setTarget] = useState('192.168.1.0/24');
    const [maxLimit, setMaxLimit] = useState('1M/1M');
    const [burstLimit, setBurstLimit] = useState('2M/2M');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const generateScript = () => {
        return `
/queue simple
add name=${queueName} target=${target} max-limit=${maxLimit} burst-limit=${burstLimit} burst-threshold=1M/1M burst-time=8s/8s

/ip firewall filter
add action=accept chain=input disabled=no protocol=icmp
add action=drop chain=forward src-address=192.168.1.10 comment="Block IP"
    `.trim();
    };

    const copyScript = () => {
        navigator.clipboard.writeText(generateScript());
        alert('Script disalin!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">MikroTik Script Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat script queue, firewall, dan hotspot dengan cepat.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Queue</label>
                            <input
                                type="text"
                                value={queueName}
                                onChange={(e) => setQueueName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Target</label>
                            <input
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                placeholder="Contoh: 192.168.1.0/24"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Max Limit</label>
                            <input
                                type="text"
                                value={maxLimit}
                                onChange={(e) => setMaxLimit(e.target.value)}
                                placeholder="Contoh: 1M/1M"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Burst Limit</label>
                            <input
                                type="text"
                                value={burstLimit}
                                onChange={(e) => setBurstLimit(e.target.value)}
                                placeholder="Contoh: 2M/2M"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={copyScript}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition mb-6"
                    >
                        📋 Salin Script
                    </button>

                    <div className="p-4 bg-gray-100 rounded-lg">
                        <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                            {generateScript()}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}