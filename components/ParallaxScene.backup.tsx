'use client';

import React, { useState, useEffect, useRef } from 'react';

const ParallaxScene = () => {
  const surferRef = useRef<HTMLImageElement>(null);
  const paragliderRef = useRef<HTMLImageElement>(null);
  const [timestamp, setTimestamp] = useState(Date.now());
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const isMouseInWindowRef = useRef(true);

  useEffect(() => {
    const animate = () => {
      if (surferRef.current && paragliderRef.current) {
        const surfer = surferRef.current;
        const paraglider = paragliderRef.current;
        let mouseX = mouseXRef.current;
        let mouseY = mouseYRef.current;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (!isMouseInWindowRef.current) {
            mouseX = windowWidth / 2;
            mouseY = windowHeight / 2;
        }

        // Calculate surfer position
        const surferX = (mouseX / windowWidth) * 100 - 50;
        const surferY = -40 + Math.sin(mouseX / 100) * 10; // Fixed Y position to keep it on the wave

        surfer.style.transform = `translateX(${surferX}%) translateY(${surferY}%) scaleX(1)`;

         // Calculate paraglider visibility and scale
        const minHeight = windowHeight * 0.1;
        const maxHeight = windowHeight * 0.5;
        let paragliderScale = 0.7;
        let paragliderY = -40;

        paragliderY = -40;
        paragliderScale = 0.5;
        paraglider.style.opacity = '1';


        paraglider.style.transform = `translateX(${((mouseX / windowWidth) * 100) - 50}%) translateY(${paragliderY}%) scale(${paragliderScale})`;
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouseXRef.current = e.clientX;
        mouseYRef.current = e.clientY;
        isMouseInWindowRef.current = true;
    };

    const handleMouseOut = () => {
        isMouseInWindowRef.current = false;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    animate();

     // Update timestamp every 5 seconds to force re-render and image refresh
    const intervalId = setInterval(() => {
      setTimestamp(Date.now());
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      clearInterval(intervalId);
    };
  }, []);

  const getRandomDelay = () => {
    return Math.random() * 5;
  };

  const getRandomScale = () => {
    const scale = 1 + (Math.random() - 0.5) * 0.4;
    return scale;
  };

  return (
    <div id="scene" style={{ position: 'relative', width: '100%', height: '100%', background: `url('/images/underwater.avif') no-repeat center center/cover` }}>
      <div className="horizon" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '2px solid transparent' }}></div>
      <img
        ref={surferRef}
        id="surfer"
        src={`/images/surfer.png`}
        alt="Surfer"
        style={{ transform: 'translateX(0%) translateY(-40%) scaleX(1)' }}
      />
      <img
        ref={paragliderRef}
        id="paraglider"
        src={`/images/paraglider.png`}
        alt="Paraglider"
        style={{ transform: 'translateX(10%) translateY(10%) scale(0.5)' }}
      />
      <div className="bubbles" style={{ left: '10%', width: '8px', height: '8px', borderRadius: '50%', bottom: '10px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '15%', width: '10px', height: '10px', borderRadius: '50%', bottom: '10px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '20%', width: '15px', height: '15px', borderRadius: '50%', bottom: '15px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '25%', width: '12px', height: '12px', borderRadius: '50%', bottom: '20px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '30%', width: '18px', height: '18px', borderRadius: '50%', bottom: '25px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '60%', width: '10px', height: '10px', borderRadius: '50%', bottom: '10px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '65%', width: '12px', height: '12px', borderRadius: '50%', bottom: '20px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '70%', width: '18px', height: '18px', borderRadius: '50%', bottom: '25px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '75%', width: '15px', height: '15px', borderRadius: '50%', bottom: '15px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <div className="bubbles" style={{ left: '80%', width: '10px', height: '10px', borderRadius: '50%', bottom: '10px', animationDelay: `${getRandomDelay()}s`, transform: `scale(${getRandomScale()})` }}></div>
      <img
        id="fish1"
        src={`/images/fish3.png`}
        alt="Fish 3"
        style={{ position: 'absolute', width: '50px', height: 'auto', top: '70%', left: '20%', transform: 'translateY(-50%)', animation: 'swim 10s linear infinite' }}
      />
      <img
        id="seahorse1"
        src={`/images/seahorse3.png`}
        alt="Seahorse 3"
        style={{ position: 'absolute', width: '60px', height: 'auto', top: '80%', left: '70%', transform: 'translateY(-50%)', animation: 'swim 15s linear infinite' }}
      />
    </div>
  );
};

export default ParallaxScene;