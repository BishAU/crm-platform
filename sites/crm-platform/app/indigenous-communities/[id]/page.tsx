'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';

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
        <div className="text-lg text-gray-500">Indigenous Community not found</div>
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
        throw new Error('Failed to update indigenous community');
      }

      const data = await response.json();
      setCommunity(data);
    } catch (error) {
      console.error('Error updating indigenous community:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <DetailView
        entityType="indigenous-communities"
        record={community}
        onSave={handleSave}
      />
    </div>
  );
}
