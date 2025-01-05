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
      <Image
        src="/images/cof_logo.png"
        alt="Clean Ocean Logo"
        width={48}
        height={48}
        className="h-12 w-auto"
      />
      <div className={`font-bold text-2xl ml-3 ${textColor}`}>
        Clean Ocean
      </div>
    </Link>
  );
}
