import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import html2canvas from 'html2canvas';

export default function TandaTanganGenerator() {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef();

    useEffect(() => {
        gsap.fromTo(canvasRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const ctx = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const downloadSignature = () => {
        const canvas = canvasRef.current;
        html2canvas(canvas, { backgroundColor: null }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'tanda-tangan.png';
            a.click();
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Generator Tanda Tangan Digital</h1>
                    <p className="text-gray-600 mb-8 text-center">
                        Buat tanda tangan digital dengan mouse atau touch.
                    </p>

                    <div className="flex justify-center mb-6 p-4 bg-white border rounded-lg">
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={200}
                            className="border border-gray-300 rounded-lg cursor-crosshair"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            style={{ border: '2px solid #ddd' }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={clearCanvas}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
                        >
                            Bersihkan
                        </button>
                        <button
                            onClick={downloadSignature}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            📥 Unduh PNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}