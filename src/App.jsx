import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import QRCodeGenerator from './pages/Tools/QRCodeGenerator';
import SubnetCalculator from './pages/Tools/SubnetCalculator';
import PasswordGenerator from './pages/Tools/PasswordGenerator';
import MikroTikScriptGenerator from './pages/Tools/MikroTikScriptGenerator';
import PortChecker from './pages/Tools/PortChecker';
import FirewallGenerator from './pages/Tools/FirewallGenarator';
import HashGenerator from './pages/Tools/HashGenerator';
import Base64Converter from './pages/Tools/Base64Converter';
import PasswordStrengthChecker from './pages/Tools/PasswordStrengthChecker';
import SuratIzinGenerator from './pages/Tools/SuratIzinGenerator';
import TandaTanganGenerator from './pages/Tools/TandaTanganGenerator';
import QRTugasGenerator from './pages/Tools/QRTugasGenerator';
import KartuPelajarGenerator from './pages/Tools/KartuPelajarGenerator';
import JadwalPelajaranGenerator from './pages/Tools/JadwalPelajaranGenerator';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/qrcode" element={<QRCodeGenerator />} />
              <Route path="/tools/subnet" element={<SubnetCalculator />} />
              <Route path="/tools/password" element={<PasswordGenerator />} />
              <Route path="/tools/script" element={<MikroTikScriptGenerator />} />
              <Route path="/tools/port" element={<PortChecker />} />
              <Route path="/tools/firewall" element={<FirewallGenerator />} />
              <Route path="/tools/hash" element={<HashGenerator />} />
              <Route path="/tools/base64" element={<Base64Converter />} />
              <Route path="/tools/password-strength" element={<PasswordStrengthChecker />} />
              <Route path="/tools/surat-izin" element={<SuratIzinGenerator />} />
              <Route path="/tools/tanda-tangan" element={<TandaTanganGenerator />} />
              <Route path="/tools/qr-tugas" element={<QRTugasGenerator />} />
              <Route path="/tools/kartu-pelajar" element={<KartuPelajarGenerator />} />
              <Route path="/tools/jadwal-pelajaran" element={<JadwalPelajaranGenerator />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;