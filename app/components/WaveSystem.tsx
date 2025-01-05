'use client';

import { useEffect, useState, useRef } from 'react';

export default function WaveSystem() {
  const [surferPosition, setSurferPosition] = useState({ x: 0, y: 0 });
  const [surferState, setSurferState] = useState<'riding' | 'sliding'>('riding');
  const waveRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const wavePhase = useRef<number>(0);
  const surferVelocity = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  const waveHeight = 300;
  const waveSpeed = 0.5;
  const surferSpeed = 0.05;
  const slideAngle = 45;

  const getWaveHeight = (x: number, time: number) => {
    const waveLength = window.innerWidth;
    const phase = (x / waveLength) * Math.PI * 2 + wavePhase.current;
    return Math.sin(phase) * (waveHeight / 2);
  };

  const animate = (time: number) => {
    if (!lastTime.current) lastTime.current = time;
    const deltaTime = (time - lastTime.current) / 1000;
    lastTime.current = time;

    // Update wave phase
    wavePhase.current += waveSpeed * deltaTime;

    // Get current wave height at surfer position
    const waveY = getWaveHeight(surferPosition.x, time);
    const waveTop = window.innerHeight - waveHeight / 2 - waveY;
    const waveBottom = window.innerHeight - waveHeight / 2 + waveY;

    // Update surfer position
    let newX = surferPosition.x + surferVelocity.current.x * deltaTime;
    let newY = surferPosition.y + surferVelocity.current.y * deltaTime;

    if (surferState === 'riding') {
      // Constrain surfer to wave surface
      newY = Math.min(Math.max(newY, waveTop), waveBottom);
      
      // Check if surfer reached wave peak
      if (Math.abs(newY - waveTop) < 10) {
        setSurferState('sliding');
        const direction = surferVelocity.current.x > 0 ? 1 : -1;
        surferVelocity.current = {
          x: direction * Math.cos(slideAngle * Math.PI / 180) * 200,
          y: Math.sin(slideAngle * Math.PI / 180) * 200
        };
      }
    } else if (surferState === 'sliding') {
      // Add foam effect
      const foam = document.createElement('div');
      foam.className = 'foam';
      foam.style.left = `${surferPosition.x}px`;
      foam.style.top = `${surferPosition.y}px`;
      waveRef.current?.appendChild(foam);
      
      // Check if surfer reached wave bottom
      if (newY >= waveBottom) {
        setSurferState('riding');
        surferVelocity.current = { x: 0, y: 0 };
      }
    }

    setSurferPosition({ x: newX, y: newY });
    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (surferState === 'riding') {
        const targetX = e.clientX;
        const targetY = getWaveHeight(targetX, performance.now());
        surferVelocity.current = {
          x: (targetX - surferPosition.x) * surferSpeed,
          y: (targetY - surferPosition.y) * surferSpeed
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [surferPosition, surferState]);

  return (
    <div className="wave-system absolute inset-0 overflow-hidden" ref={waveRef}>
      <div
        className="surfer text-8xl absolute z-20 transition-all duration-200"
        style={{
          left: `${surferPosition.x}px`,
          top: `${surferPosition.y}px`,
          transform: `scaleX(${surferVelocity.current.x > 0 ? 1 : -1})`
        }}
      >
        🏄
      </div>
      <style jsx>{`
        .wave-system {
          background: linear-gradient(180deg, transparent 0%, rgba(13, 37, 53, 0.8) 100%);
        }
        .surfer {
          will-change: transform, left, top;
        }
        .foam {
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: foam 1s ease-out forwards;
        }
        @keyframes foam {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}