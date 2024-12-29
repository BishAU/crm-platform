'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';

export default function OutfallPage() {
  const [outfall, setOutfall] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchOutfall = async () => {
      try {
        const response = await fetch(`/api/outfalls/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch outfall');
        }
        const data = await response.json();
        setOutfall(data);
      } catch (error) {
        console.error('Error fetching outfall:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOutfall();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!outfall) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Outfall not found</div>
      </div>
    );
  }

  const handleSave = async (updatedOutfall: any) => {
    try {
      const response = await fetch(`/api/outfalls/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOutfall),
      });

      if (!response.ok) {
        throw new Error('Failed to update outfall');
      }

      const data = await response.json();
      setOutfall(data);
    } catch (error) {
      console.error('Error updating outfall:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <DetailView
          entityType="outfalls"
          record={outfall}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}
