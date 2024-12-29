"use client";
import React from 'react';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import DataCard from './components/DataCard';
import LoadingState from './components/LoadingState';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingState />;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col gap-4">
        <DataCard title="Dashboard" description="Welcome to the CRM Platform" />
      </div>
    </AuthenticatedLayout>
  );
};

export default Home;
