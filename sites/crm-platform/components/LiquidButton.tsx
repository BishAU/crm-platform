'use client';

import { ButtonHTMLAttributes, useRef } from 'react';

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function LiquidButton({ 
  children, 
  className = '',
  fullWidth = false,
  size = 'md',
  ...props 
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden bg-blue-600 text-white font-semibold rounded-lg
        ${fullWidth ? 'w-full' : ''}
        ${sizeClasses[size]}
        ${className}
        transition-all duration-300 hover:bg-blue-700
        before:content-[''] before:absolute before:inset-0 
        before:bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_60%)] 
        before:scale-0 before:opacity-0 hover:before:scale-[2.5] hover:before:opacity-100 
        before:transition-all before:duration-500 before:ease-in-out
      `}
      onMouseMove={(e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
        buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
      }}
      {...props}
    >
      {/* Animated water ripples */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="water-ripple" />
      </div>
      {/* Animated dots */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1.5 h-1.5 bg-white rounded-full opacity-0
              animate-float-${i % 5}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
