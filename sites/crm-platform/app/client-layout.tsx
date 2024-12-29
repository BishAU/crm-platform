'use client';

import AuthenticatedLayout from './components/AuthenticatedLayout';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  );
}
