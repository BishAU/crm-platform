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

  const clouds = Array.from({ length: 5 }).map((_, i) => ({
    index: i,
    speed: (60 + i * 8) * 0.1, // Reduce speed to 10%
    size: 6 - i * 0.8,   // Adjust size for distance
    top: 10 + i * 10,    // Adjust top position for distance
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {clouds.map((cloud) => (
        <div
          key={cloud.index}
          className="absolute text-6xl text-white opacity-80 blur-sm"
          style={{
            top: `${cloud.top}%`,
            fontSize: `${cloud.size}rem`,
            animation: `float-cloud ${cloud.speed}s linear infinite ${cloud.index * 10}s`,
            transform: `translateX(${mouseX * 0.01}px) translateY(${mouseY * 0.01}px)`
          }}
        >
          🌀
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