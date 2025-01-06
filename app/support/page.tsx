'use client';

import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function SupportPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Support</h1>
        <p>This page provides an overview of support related features.</p>
      </div>
    </AuthenticatedLayout>
  );
}
