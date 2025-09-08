import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MikroTikScriptGenerator() {
    const [scriptType, setScriptType] = useState('queue');
    const [targetIp, setTargetIp] = useState('');
    const [maxLimit, setMaxLimit] = useState('1M/1M');
    const [comment, setComment] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const generateScript = () => {
        let script = '';
        if (scriptType === 'queue') {
            script = `/queue simple add name="${comment || 'User-Queue'}" target=${targetIp} max-limit=${maxLimit}`;
        } else if (scriptType === 'firewall') {
            script = `/ip firewall filter add action=drop src-address=${targetIp} comment="${comment || 'Block IP'}"`;
        } else if (scriptType === 'hotspot') {
            script = `/ip hotspot user add name="${comment || 'Hotspot-User'}" password="123456" profile=default`;
        }
        return script;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateScript());
        alert('Script disalin!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">MikroTik Script Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat script queue, firewall, hotspot dengan satu klik.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Jenis Script</label>
                        <select
                            value={scriptType}
                            onChange={(e) => setScriptType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="queue">Queue (Bandwidth)</option>
                            <option value="firewall">Firewall (Block IP)</option>
                            <option value="hotspot">Hotspot (User)</option>
                        </select>
                    </div>

                    {scriptType !== 'hotspot' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">IP Target</label>
                            <input
                                type="text"
                                value={targetIp}
                                onChange={(e) => setTargetIp(e.target.value)}
                                placeholder="Contoh: 192.168.1.10"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {scriptType === 'queue' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Bandwidth (max-limit)</label>
                            <input
                                type="text"
                                value={maxLimit}
                                onChange={(e) => setMaxLimit(e.target.value)}
                                placeholder="Contoh: 1M/1M"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Komentar (opsional)</label>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Contoh: User-Home"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            📋 Salin Script
                        </button>
                    </div>

                    {generateScript() && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p><strong>Script MikroTik:</strong></p>
                            <pre className="mt-2 bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                                {generateScript()}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}