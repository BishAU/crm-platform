'use client';

import { ReactNode } from 'react';
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="flex-1 p-8 bg-ocean-50">
          {children}
        </main>
      </div>
    </div>
  );
}
