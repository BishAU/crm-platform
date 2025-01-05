'use client';

import DashboardClient from './DashboardClient';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function DashboardPage() {
  return (
    <AuthenticatedLayout>
      <DashboardClient />
    </AuthenticatedLayout>
  );
}
