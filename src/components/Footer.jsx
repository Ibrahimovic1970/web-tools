import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Footer() {
    const footerRef = useRef();

    useEffect(() => {
        gsap.fromTo(footerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-black text-white text-center py-8 mt-16"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Social Icons */}
                <div className="flex justify-center space-x-8 mb-6 text-2xl">
                    <a
                        href="https://linkedin.com/in/ahmadibrahimovic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-transform hover:scale-110"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a
                        href="https://instagram.com/ahmadibrahimovic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-400 transition-transform hover:scale-110"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a
                        href="https://github.com/ahmadibrahimovic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 transition-transform hover:scale-110"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-500">
                    &copy; 2025 Ahmad Ibrahimovic. All rights reserved.
                </p>
            </div>
        </footer>
    );
}