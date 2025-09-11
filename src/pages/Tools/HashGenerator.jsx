import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HashGenerator() {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const generateHash = () => {
    // Simulasi hash (di dunia nyata, gunakan crypto)
    const hash = btoa(text + algorithm).toLowerCase().substring(0, 32);
    setHash(hash);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">Hash Generator</h1>
          <p className="text-gray-600 mb-8 text-center">
            Generate MD5, SHA1, SHA256 dari teks.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Teks</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Algoritma</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="md5">MD5</option>
              <option value="sha1">SHA1</option>
              <option value="sha256">SHA256</option>
            </select>
          </div>

          <button
            onClick={generateHash}
            disabled={!text}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 mb-6"
          >
            🔐 Generate Hash
          </button>

          {hash && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p><strong>Hasil:</strong></p>
              <pre className="mt-2 bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                {hash}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}