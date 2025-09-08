import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ToolCard({ title, desc, icon: Icon, path }) {
    const cardRef = useRef();

    useEffect(() => {
        const el = cardRef.current;

        // Animasi saat muncul
        gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        // Hover effect
        const onMouseEnter = () => {
            gsap.to(el, { y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", duration: 0.3 });
        };

        const onMouseLeave = () => {
            gsap.to(el, { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3 });
        };

        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);

        return () => {
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="bg-white p-6 rounded-xl border border-gray-200 cursor-pointer"
            onClick={() => (window.location.href = path)}
        >
            <Icon className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
        </div>
    );
}