import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const containerRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!password) {
      setScore(0);
      setFeedback([]);
      return;
    }

    let score = 0;
    const fb = [];

    if (password.length >= 8) score += 1;
    else fb.push('Minimal 8 karakter');

    if (/[A-Z]/.test(password)) score += 1;
    else fb.push('Huruf besar (A-Z)');

    if (/[a-z]/.test(password)) score += 1;
    else fb.push('Huruf kecil (a-z)');

    if (/[0-9]/.test(password)) score += 1;
    else fb.push('Angka (0-9)');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else fb.push('Simbol (!@#$%)');

    setScore(score);
    setFeedback(fb);

    // Animasi progress bar
    gsap.to(progressBarRef.current, {
      width: `${(score / 5) * 100}%`,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [password]);

  const getStrength = () => {
    if (score <= 2) return { label: 'Lemah', color: 'bg-red-500' };
    if (score === 3) return { label: 'Sedang', color: 'bg-yellow-500' };
    return { label: 'Kuat', color: 'bg-green-500' };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gray-50 py-12" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">Password Strength Checker</h1>
          <p className="text-gray-600 mb-8 text-center">
            Cek kekuatan password kamu.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {password && (
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Kekuatan</span>
                <span className={`text-sm font-medium ${strength.color === 'bg-red-500' ? 'text-red-600' : strength.color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {strength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  ref={progressBarRef}
                  className={`h-2.5 rounded-full ${strength.color} transition-all duration-300`}
                  style={{ width: '0%' }}
                ></div>
              </div>
              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                {feedback.length > 0 ? (
                  feedback.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="flex items-center text-green-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Password kamu sudah kuat!
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}