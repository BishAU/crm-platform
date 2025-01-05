'use client';

import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function SupportTicketsPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Support Tickets</h1>
        <p>This page will allow you to create and manage support tickets.</p>
      </div>
    </AuthenticatedLayout>
  );
}