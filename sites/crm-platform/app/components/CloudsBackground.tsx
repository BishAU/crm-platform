'use client';

import { useEffect, useState } from 'react';

export default function CloudsBackground() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-6xl text-white opacity-80 blur-sm"
          style={{
            top: `${10 + i * 15}%`,
            animation: `float-cloud ${60 + i * 5}s linear infinite ${i * 10}s`,
            transform: `translateX(${mouseX * 0.01}px) translateY(${mouseY * 0.01}px)`
          }}
        >
          ☁️
        </div>
      ))}
      <style jsx>{`
        @keyframes float-cloud {
          from { transform: translateX(100vw); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}