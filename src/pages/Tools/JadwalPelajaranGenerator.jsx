import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import html2canvas from 'html2canvas';

export default function JadwalPelajaranGenerator() {
    const [hari, setHari] = useState({ senin: [], selasa: [], rabu: [], kamis: [], jumat: [] });
    const [mapel, setMapel] = useState('');
    const [jam, setJam] = useState('');
    const [hariInput, setHariInput] = useState('senin');
    const containerRef = useRef();
    const scheduleRef = useRef();

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const tambahMapel = () => {
        if (!mapel || !jam) return;
        setHari(prev => ({
            ...prev,
            [hariInput]: [...prev[hariInput], { mapel, jam }]
        }));
        setMapel('');
        setJam('');
    };

    const hapusMapel = (hariKey, index) => {
        setHari(prev => {
            const updated = [...prev[hariKey]];
            updated.splice(index, 1);
            return { ...prev, [hariKey]: updated };
        });
    };

    const downloadJadwal = () => {
        html2canvas(scheduleRef.current, { backgroundColor: null, scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'jadwal-pelajaran.png';
            a.click();
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-center">Generator Jadwal Pelajaran</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat jadwal pelajaran keren dan mudah dibaca.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Mata Pelajaran</label>
                                <input
                                    type="text"
                                    value={mapel}
                                    onChange={(e) => setMapel(e.target.value)}
                                    placeholder="Contoh: Pemrograman Web"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Jam</label>
                                <input
                                    type="text"
                                    value={jam}
                                    onChange={(e) => setJam(e.target.value)}
                                    placeholder="Contoh: 07.30 - 08.30"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Hari</label>
                                <select
                                    value={hariInput}
                                    onChange={(e) => setHariInput(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="senin">Senin</option>
                                    <option value="selasa">Selasa</option>
                                    <option value="rabu">Rabu</option>
                                    <option value="kamis">Kamis</option>
                                    <option value="jumat">Jumat</option>
                                </select>
                            </div>
                            <button
                                onClick={tambahMapel}
                                disabled={!mapel || !jam}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
                            >
                                ➕ Tambah Mapel
                            </button>
                            <button
                                onClick={downloadJadwal}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition mt-2"
                            >
                                📥 Download Jadwal
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <div
                                ref={scheduleRef}
                                className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="bg-blue-600 text-white p-4 text-center">
                                    <h3 className="font-bold text-lg">JADWAL PELAJARAN</h3>
                                    <p className="text-sm">SMK NEGERI 1 TEKNOLOGI INFORMATIKA</p>
                                </div>
                                {Object.entries(hari).map(([day, classes]) =>
                                    classes.length > 0 && (
                                        <div key={day} className="p-4 border-b border-gray-200">
                                            <h4 className="font-semibold capitalize text-gray-800 mb-2">{day}</h4>
                                            <div className="space-y-2">
                                                {classes.map((cls, i) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-100 rounded text-sm">
                                                        <span>{cls.mapel}</span>
                                                        <span className="text-xs text-gray-600">{cls.jam}</span>
                                                        <button
                                                            onClick={() => hapusMapel(day, i)}
                                                            className="text-red-500 text-xs ml-2"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}