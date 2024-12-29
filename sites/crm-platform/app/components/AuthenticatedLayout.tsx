'use client';

import Sidebar from './Sidebar';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '🏠',
  },
  {
    name: 'Outfalls',
    href: '/outfalls',
    icon: '🌊',
  },
  {
    name: 'Facilities',
    href: '/facilities',
    icon: '🏭',
  },
  {
    name: 'People',
    href: '/people',
    icon: '👥',
  },
  {
    name: 'Water Authorities',
    href: '/water-authorities',
    icon: '💧',
  },
  {
    name: 'Indigenous Communities',
    href: '/indigenous-communities',
    icon: '🌿',
  },
  {
    name: 'Politicians',
    href: '/politicians',
    icon: '👔',
  },
  {
    name: 'Support Tickets',
    href: '/support-tickets',
    icon: '🎫',
  },
  {
    name: 'Observations',
    href: '/observations',
    icon: '🔍',
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: '👤',
  },
  {
    name: 'Outfall Types',
    href: '/outfall-types',
    icon: '🌊',
  },
  {
    name: 'Marketing',
    href: '/marketing',
    icon: '📈',
  },
];
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && pathname === '/') {
      router.push('/dashboard');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40">
        <Sidebar menuItems={menuItems} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
