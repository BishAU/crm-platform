'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ocean-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-ocean-900">404</h1>
        <p className="mt-4 text-2xl text-ocean-700">Page Not Found</p>
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