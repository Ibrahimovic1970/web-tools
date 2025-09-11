import { useState } from 'react';
import ToolCard from '../components/ToolCard';
import { FaNetworkWired, FaQrcode, FaLock, FaCalculator, FaCode, FaShieldAlt, FaBarcode, FaEnvelope, FaSignature, FaIdCard, FaCalendarAlt } from 'react-icons/fa';

export default function ToolsPage() {
    const [search, setSearch] = useState('');

    const tools = [
        { title: "Subnet Calculator", desc: "Hitung network, broadcast, dan jumlah host", icon: FaCalculator, path: "/tools/subnet" },
        { title: "Firewall Generator", desc: "Block IP atau port dengan cepat", icon: FaShieldAlt, path: "/tools/firewall" },
        { title: "QR Code Generator", desc: "Buat QR Code untuk URL, teks, atau WiFi", icon: FaQrcode, path: "/tools/qrcode" },
        { title: "MikroTik Script Generator", desc: "Buat script queue, firewall, hotspot", icon: FaCode, path: "/tools/script" },
        { title: "Port Checker", desc: "Cek informasi port jaringan", icon: FaNetworkWired, path: "/tools/port" },
        { title: "Password Generator", desc: "Hasilkan password kuat & aman", icon: FaLock, path: "/tools/password" },
        { title: "Password Strength Checker", desc: "Cek kekuatan password kamu", icon: FaShieldAlt, path: "/tools/password-strength" },
        { title: "Hash Generator", desc: "Generate MD5, SHA1, SHA256 dari teks", icon: FaLock, path: "/tools/hash" },
        { title: "Base64 Converter", desc: "Encode/decode teks ke Base64", icon: FaCode, path: "/tools/base64" },
        { title: "Tanda Tangan Digital", desc: "Buat tanda tangan digital dengan mouse", icon: FaSignature, path: "/tools/tanda-tangan" },
        { title: "Surat Izin Sekolah", desc: "Buat surat izin tidak masuk sekolah", icon: FaEnvelope, path: "/tools/surat-izin" },
        { title: "QR Code Tugas", desc: "Siswa kumpulkan tugas dengan scan QR", icon: FaQrcode, path: "/tools/qr-tugas" },
        { title: "Kartu Pelajar", desc: "Buat kartu pelajar digital dengan foto & QR", icon: FaIdCard, path: "/tools/kartu-pelajar" },
        { title: "Jadwal Pelajaran", desc: "Buat jadwal pelajaran keren & mudah dibaca", icon: FaCalendarAlt, path: "/tools/jadwal-pelajaran" },
    ];

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.desc.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-8 text-center">Semua Tools</h1>
                <div className="mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari tools..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool, index) => (
                        <ToolCard key={index} {...tool} />
                    ))}
                </div>
            </div>
        </div>
    );
}