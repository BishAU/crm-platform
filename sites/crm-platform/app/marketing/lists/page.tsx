'use client';

import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function MarketingListsPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Marketing Lists</h1>
        <p>This page will allow you to create and manage marketing lists.</p>
      </div>
    </AuthenticatedLayout>
  );
}
