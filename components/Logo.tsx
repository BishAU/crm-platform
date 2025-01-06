'use client';
import { error } from 'console';
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
      <img
        src="/images/cof_logo.png"
        alt="Clean Ocean Logo"
        className="h-12 w-auto"
        style={{width: '48px', height: '48px'}}
      />
    </Link>
  );
}
