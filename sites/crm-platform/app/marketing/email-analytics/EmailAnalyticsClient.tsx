'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import DetailView from '@components/DetailView';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface EmailAnalytics {
  id: string;
  campaign: string;
  sentDate: string;
  opens: number;
  clicks: number;
  bounces: number;
}

export default function EmailAnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [emailAnalytics, setEmailAnalytics] = useState<EmailAnalytics[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const fetchEmailAnalytics = async () => {
      try {
        const response = await fetch('/api/marketing/email-analytics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmailAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch email analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchEmailAnalytics();
    }
  }, [status, router]);

  const defaultColumns = [
    { field: 'id', headerName: 'ID', isPrimary: true },
    { field: 'campaign', headerName: 'Campaign' },
    { field: 'sentDate', headerName: 'Sent Date' },
    { field: 'opens', headerName: 'Opens' },
    { field: 'clicks', headerName: 'Clicks' },
    { field: 'bounces', headerName: 'Bounces' },
  ];

  // Get the ordered field names from localStorage or use default order
  const orderedFields = getFieldOrder('emailAnalytics', defaultColumns.map(col => col.field));

  // Reorder columns based on the saved field order
  const columns = orderedFields
    .map(field => defaultColumns.find(col => col.field === field))
    .filter((col): col is typeof defaultColumns[0] => col !== undefined);

  const handleSave = async (record: Record<string, any>) => {
    console.log('Save email analytics:', record);
    try {
      const response = await fetch(`/api/marketing/email-analytics/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedEmailAnalytics = await response.json();
      setEmailAnalytics(emailAnalytics.map(ea => ea.id === updatedEmailAnalytics.id ? updatedEmailAnalytics : ea));
    } catch (error) {
      console.error('Failed to save email analytics data:', error);
    }
    setSelectedRecord(null);
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Email Analytics</h1>
        <DataGrid
          rows={emailAnalytics}
          columns={columns}
          entityType="emailAnalytics"
          onSave={handleSave}
          loading={loading}
        />
        {selectedRecord && (
          <DetailView
            entityType="emailAnalytics"
            record={selectedRecord}
            onSave={handleSave}
          />
        )}
      </div>
    </AuthenticatedLayout>
  );
}
