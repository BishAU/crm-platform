'use client';

import { useEffect, useState } from 'react';
import DetailView from '@components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function IndigenousCommunityPage() {
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`/api/indigenous-communities/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch indigenous community');
        }
        const data = await response.json();
        setCommunity(data);
      } catch (error) {
        console.error('Error fetching indigenous community:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCommunity();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Indigenous community not found</div>
      </div>
    );
  }

  const handleSave = async (updatedCommunity: any) => {
    try {
      const response = await fetch(`/api/indigenous-communities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCommunity),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update indigenous community');
      }

      const data = await response.json();
      setCommunity(data);
    } catch (error) {
      console.error('Error updating indigenous community:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex-1 p-8">
        <DetailView
          entityType="indigenousCommunity"
          record={community}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}
