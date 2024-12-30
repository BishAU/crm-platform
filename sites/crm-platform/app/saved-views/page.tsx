'use client';

import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function SavedViewsPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Saved Views</h1>
          <p className="mt-2 text-sm text-gray-700">
            Access and manage your customized views across different sections
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <p className="text-gray-500">
              View, edit, and manage your saved custom views for different sections of the platform. These views help you quickly access frequently used filters and configurations.
            </p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}