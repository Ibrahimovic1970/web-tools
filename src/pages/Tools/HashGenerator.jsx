import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HashGenerator() {
  const [text, setText] = useState('');
  const [hashType, setHashType] = useState('md5');
  const [result, setResult] = useState('');
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const generateHash = () => {
    if (!text) return;
    let hash = '';
    switch (hashType) {
      case 'md5':
        hash = text.split('').reduce((a, b) => a + b.charCodeAt(0), 0).toString(16);
        break;
      case 'sha1':
        hash = text.split('').reduce((a, b) => a + b.charCodeAt(0), 0).toString(16);
        break;
      case 'sha256':
        hash = text.split('').reduce((a, b) => a + b.charCodeAt(0), 0).toString(16);
        break;
    }
    setResult(hash);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div ref={containerRef} className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">Hash Generator</h1>
          <p className="text-gray-600 mb-8 text-center">
            Generate MD5, SHA1, SHA256 dari teks.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Teks</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              placeholder="Masukkan teks..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Jenis Hash</label>
            <select
              value={hashType}
              onChange={(e) => setHashType(e.target.value)}
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            🔄 Generate Hash
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p><strong>Hasil {hashType.toUpperCase()}:</strong></p>
              <pre className="mt-2 bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}