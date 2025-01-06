'use client';

import Link from 'next/link';

export default function NotFound() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ocean-50 relative overflow-hidden z-10">
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/underwater.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      </div>
      <div className="text-center z-20">
        <h1 className="text-9xl font-bold text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px #000000', color: '#ffffff', fontWeight: '900' }}>404</h1>
        <p className="mt-4 text-4xl text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px #000000', color: '#ffffff', fontWeight: '900' }}>Page Not Found</p>
        <p className="mt-2 text-ocean-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}