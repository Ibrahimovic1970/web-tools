import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SuratIzinGenerator() {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [alasan, setAlasan] = useState('');
  const [nomorSurat, setNomorSurat] = useState('001/2025');
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const printSurat = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Surat Izin - ${nama}</title>
          <style>
            @media print {
              body {
                font-family: "Times New Roman", serif;
                margin: 2cm;
                line-height: 1.6;
                color: #000;
                background-color: white;
              }
              .container {
                max-width: 800px;
                margin: 0 auto;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #000;
                padding-bottom: 29px;
              }
              .logo {
                float: left;
                height: 80px;
                margin-right: 20px;
                margin-bottom: 10px;
              }
              .school-info {
                font-size: 14pt;
                font-weight: bold;
              }
              .school-subtitle {
                font-size: 10pt;
                font-style: italic;
              }
              .nomor-surat {
                text-align: right;
                font-size: 11pt;
                margin-bottom: 20px;
              }
              .content {
                margin: 30px 0;
                text-align: justify;
              }
              .signature {
                text-align: right;
                margin-top: 60px;
                font-size: 12pt;
              }
              .tanda-tangan {
                border-bottom: 1px solid black;
                width: 180px;
                margin: 0 auto;
                opacity: 0.8;
              }
              .footer {
                margin-top: 50px;
                text-align: center;
                font-size: 9pt;
                color: #555;
              }
            }
            body {
              font-family: "Times New Roman", serif;
              margin: 2cm;
              line-height: 1.6;
              color: #000;
              background-color: white;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 29px;
            }
            .logo {
              float: left;
              height: 80px;
              margin-right: 20px;
              margin-bottom: 10px;
            }
            .school-info {
              font-size: 14pt;
              font-weight: bold;
            }
            .school-subtitle {
              font-size: 10pt;
              font-style: italic;
            }
            .nomor-surat {
              text-align: right;
              font-size: 11pt;
              margin-bottom: 20px;
            }
            .content {
              margin: 30px 0;
              text-align: justify;
            }
            .signature {
              text-align: right;
              margin-top: 60px;
              font-size: 12pt;
            }
            .tanda-tangan {
              border-bottom: 1px solid black;
              width: 180px;
              margin: 0 auto;
              opacity: 0.8;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 9pt;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="/pages/assets/LogoUtama.png" alt="Logo Sekolah" class="logo" />
              <div>
                <div class="school-info">SMK NEGERI 1 TEKNOLOGI INFORMATIKA</div>
                <div class="school-subtitle">Jl. Teknologi No. 1, Kota Digital | Telp: (021) 1234-5678</div>
              </div>
            </div>
            <div class="nomor-surat">
              No: ${nomorSurat || '001/2025'}
            </div>
            <div class="content">
              <p><strong>Yth. Bapak/Ibu Wali Kelas ${kelas}</strong></p>
              <p>Dengan hormat,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>
              <table style="margin-left: 20px;">
                <tr><td style="padding: 4px 0;">Nama</td><td style="padding: 4px 0;">:</td><td style="padding: 4px 0; font-weight: bold;">${nama}</td></tr>
                <tr><td style="padding: 4px 0;">Kelas</td><td style="padding: 4px 0;">:</td><td style="padding: 4px 0;">${kelas}</td></tr>
                <tr><td style="padding: 4px 0;">Tanggal</td><td style="padding: 4px 0;">:</td><td style="padding: 4px 0;">${tanggal}</td></tr>
              </table>
              <br />
              <p>Dengan ini mengajukan izin tidak masuk sekolah karena <strong>${alasan}</strong>.</p>
              <p>Demikian surat izin ini saya buat. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.</p>
            </div>
            <div class="signature">
              Hormat saya,<br /><br /><br />
              <div class="tanda-tangan"></div><br />
              ${nama}
            </div>
            <div class="footer">
              Dokumen ini sah jika dicetak dari NetTool.id
            </div>
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.onafterprint = () => window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">Generator Surat Izin Sekolah</h1>
          <p className="text-gray-600 mb-8 text-center">
            Buat surat izin tidak masuk sekolah dengan cepat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Ahmad Ibrahimovic"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kelas</label>
              <input
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Contoh: XII SIJA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Nomor Surat</label>
            <input
              type="text"
              value={nomorSurat}
              onChange={(e) => setNomorSurat(e.target.value)}
              placeholder="Contoh: 001/2025"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Alasan Izin</label>
            <input
              type="text"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              placeholder="Contoh: sakit flu"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={printSurat}
            disabled={!nama || !kelas || !tanggal || !alasan}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            🖨️ Cetak Surat
          </button>
        </div>
      </div>
    </div>
  );
}