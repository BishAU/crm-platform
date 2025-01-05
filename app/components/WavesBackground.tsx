'use client';

import { useEffect, useRef } from 'react';
import WaveSystem from './WaveSystem';

export default function WavesBackground() {
  const oceanRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 to-ocean-700" />
      <div ref={skyRef} className="sky absolute inset-0 z-10">
        <div className="cloud" style={{ top: '10%', animationDelay: '0s' }}>☁️</div>
        <div className="cloud" style={{ top: '20%', animationDelay: '-5s' }}>☁️</div>
        <div className="cloud" style={{ top: '30%', animationDelay: '-10s' }}>☁️</div>
        <div className="cloud" style={{ top: '15%', animationDelay: '-15s' }}>☁️</div>
        <div className="cloud" style={{ top: '25%', animationDelay: '-20s' }}>☁️</div>
        <div className="paraglider" style={{ top: '35%', animationDelay: '0s' }}>🪂</div>
        <div className="paraglider" style={{ top: '45%', animationDelay: '-10s' }}>🪂</div>
      </div>
      <div ref={oceanRef} className="ocean absolute bottom-0 left-0 w-full h-2/5 bg-ocean-800 overflow-hidden">
        <div className="wave"></div>
        <div className="wave" style={{ animationDelay: '-0.125s', bottom: '-25px', opacity: 0.8 }}></div>
        <div className="wave" style={{ animationDelay: '-0.25s', bottom: '-40px', opacity: 0.6 }}></div>
        <div className="fish" style={{ top: '75%', animationDelay: '0s' }}>🐟</div>
        <div className="fish" style={{ top: '85%', animationDelay: '-7s' }}>🐟</div>
        <div className="fish" style={{ top: '80%', animationDelay: '-14s' }}>🐟</div>
        <div className="surfer absolute" style={{ bottom: '60%', left: '50%', transform: 'translateX(-50%)' }}>🏄</div>
      </div>
      <style jsx>{`
        .wave {
          background: url(/wave.svg) repeat-x;
          position: absolute;
          bottom: -10px;
          width: 6400px;
          height: 198px;
          animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          transform: translate3d(0, 0, 0);
        }

        .fish {
          position: absolute;
          font-size: 40px;
          z-index: 10;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
          animation: swim 20s linear infinite;
        }

        .cloud {
          position: absolute;
          font-size: 60px;
          animation: float 30s linear infinite;
          opacity: 0.8;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
        }

        .paraglider {
          position: absolute;
          font-size: 60px;
          animation: glide 25s linear infinite;
          opacity: 0.9;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
        }

        .surfer {
          font-size: 40px;
          animation: surf 15s ease-in-out infinite;
          z-index: 10;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
        }

        @keyframes wave {
          0% { margin-left: 0; }
          100% { margin-left: -1600px; }
        }

        @keyframes swim {
          0% { transform: translateX(-100%) scaleX(1); }
          49% { transform: translateX(100%) scaleX(1); }
          50% { transform: translateX(100%) scaleX(-1); }
          99% { transform: translateX(-100%) scaleX(-1); }
          100% { transform: translateX(-100%) scaleX(1); }
        }

        @keyframes float {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }

        @keyframes glide {
          0% { 
            transform: translate(-100%, 0);
          }
          50% {
            transform: translate(50vw, -20px);
          }
          100% {
            transform: translate(100vw, 0);
          }
        }

        @keyframes surf {
          0% { transform: translate(-50%, 0) rotate(0deg); }
          25% { transform: translate(-50%, -20px) rotate(-5deg); }
          50% { transform: translate(-50%, 0) rotate(0deg); }
          75% { transform: translate(-50%, -15px) rotate(5deg); }
          100% { transform: translate(-50%, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
