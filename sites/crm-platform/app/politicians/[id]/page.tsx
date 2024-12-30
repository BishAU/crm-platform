'use client';

import { useEffect, useState } from 'react';
import DetailView from '@components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function PoliticianPage() {
  const [politician, setPolitician] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPolitician = async () => {
      try {
        const response = await fetch(`/api/politicians/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch politician');
        }
        const data = await response.json();
        setPolitician(data);
      } catch (error) {
        console.error('Error fetching politician:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPolitician();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!politician) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Politician not found</div>
      </div>
    );
  }

  const handleSave = async (updatedPolitician: any) => {
    try {
      const response = await fetch(`/api/politicians/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPolitician),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update politician');
      }

      const data = await response.json();
      setPolitician(data);
    } catch (error) {
      console.error('Error updating politician:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex-1 p-8">
        <DetailView
          entityType="politicians"
          record={politician}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}
