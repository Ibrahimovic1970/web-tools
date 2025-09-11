import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
        generatePassword();
    }, []);

    const generatePassword = () => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let chars = '';
        if (includeUpper) chars += upper;
        if (includeLower) chars += lower;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        if (chars === '') return;

        let pwd = '';
        for (let i = 0; i < length; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(pwd);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        alert('Password disalin!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Password Generator</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Hasilkan password kuat & aman.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Panjang: {length}</label>
                        <input
                            type="range"
                            min="6"
                            max="20"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={includeUpper}
                                onChange={() => setIncludeUpper(!includeUpper)}
                                className="mr-2"
                            />
                            Huruf Besar
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={includeLower}
                                onChange={() => setIncludeLower(!includeLower)}
                                className="mr-2"
                            />
                            Huruf Kecil
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(!includeNumbers)}
                                className="mr-2"
                            />
                            Angka
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols(!includeSymbols)}
                                className="mr-2"
                            />
                            Simbol
                        </label>
                    </div>

                    <div className="flex items-center mb-6 p-3 border border-gray-300 rounded-lg bg-white">
                        <span className="flex-grow font-mono">{password}</span>
                        <button
                            onClick={copyPassword}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                            📋
                        </button>
                    </div>

                    <button
                        onClick={generatePassword}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        🔁 Generate
                    </button>
                </div>
            </div>
        </div>
    );
}