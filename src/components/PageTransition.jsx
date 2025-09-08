import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
    const location = useLocation();
    const pageRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi keluar halaman lama
            gsap.to(pageRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in"
            });

            // Animasi masuk halaman baru
            gsap.fromTo(pageRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            {children}
        </div>
    );
}