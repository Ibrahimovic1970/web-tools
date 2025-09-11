import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Import logo dari folder assets
import LogoUtama from '../pages/assets/Gambar.png';

export default function Navbar() {
    const navRef = useRef();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Animasi saat muncul
        gsap.fromTo(navRef.current,
            { y: -100 },
            { y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isScrollingDown = scrollTop > 50;

            if (isScrollingDown) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setIsScrolled(isScrollingDown);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                } ${isScrolled ? 'translate-y-[-100%]' : 'translate-y-0'}`}
        >
            <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                    <img src={LogoUtama} alt="Logo NetTool.id" className="h-8 w-auto" />
                </Link>

                {/* Menu */}
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</Link>
                    <Link to="/tools" className="text-gray-700 hover:text-blue-600 transition font-medium">Tools</Link>
                </div>
            </div>
        </nav>
    );
}