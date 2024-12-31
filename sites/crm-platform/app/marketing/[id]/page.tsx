'use client';

import { useEffect, useState } from 'react';
import DetailView from '@components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function MarketingDetailPage() {
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`/api/marketing/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch marketing record');
        }
        const data = await response.json();
        setRecord(data);
      } catch (error) {
        console.error('Error fetching marketing record:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecord();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Marketing record not found</div>
      </div>
    );
  }

  const handleSave = async (updatedRecord: any) => {
    try {
      const response = await fetch(`/api/marketing/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update marketing record');
      }

      const data = await response.json();
      setRecord(data);
    } catch (error) {
      console.error('Error updating marketing record:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex-1 p-8">
        <DetailView
          entityType="marketing"
          record={record}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}