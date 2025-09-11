import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
    const location = useLocation();
    const pageRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(pageRef.current, {
                opacity: 1,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
            });

            gsap.fromTo(pageRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div ref={pageRef} className="min-h-full">
            {children}
        </div>
    );
}