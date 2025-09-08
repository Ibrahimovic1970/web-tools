import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const generatePassword = () => {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password disalin!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div ref={containerRef} className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Password Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Hasilkan password kuat & aman dengan satu klik.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Panjang Password</label>
                        <input
                            type="number"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            min="4"
                            max="32"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={() => setIncludeUppercase(!includeUppercase)}
                                className="mr-2"
                            />
                            Huruf Besar
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(!includeNumbers)}
                                className="mr-2"
                            />
                            Angka
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols(!includeSymbols)}
                                className="mr-2"
                            />
                            Simbol
                        </label>
                    </div>

                    <button
                        onClick={generatePassword}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full mb-6"
                    >
                        🎯 Generate Password
                    </button>

                    {password && (
                        <div className="relative bg-gray-100 p-3 rounded-lg text-sm">
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className="w-full bg-gray-100 text-sm"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600"
                            >
                                📋 Salin
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}