'use client';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  
  return (
    <Link href="/dashboard" className={`flex items-center ${className}`}>
      <div className="relative w-12 h-12">
        <Image
          src="/images/cof__logo.png"
          alt="Clean Ocean Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className={`font-bold text-2xl ml-3 ${textColor}`}>
        Clean Ocean
      </div>
    </Link>
  );
}
