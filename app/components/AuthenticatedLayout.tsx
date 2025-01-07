'use client';

import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Add debugging
    console.log('AuthenticatedLayout - Session status:', status);
    console.log('AuthenticatedLayout - Session data:', session);

    if (status === 'unauthenticated') {
      console.log('User is unauthenticated, redirecting to login...');
      window.location.href = '/login';
    }
  }, [status, session, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    console.log('AuthenticatedLayout - Loading state');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  // Show loading state if unauthenticated (while redirect happens)
  if (status === 'unauthenticated') {
    console.log('AuthenticatedLayout - Unauthenticated state');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  // Only render the layout if authenticated
  console.log('AuthenticatedLayout - Rendering authenticated layout');
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
