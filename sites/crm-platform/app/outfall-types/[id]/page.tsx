'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';

export default function OutfallTypePage() {
  const [outfallType, setOutfallType] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchOutfallType = async () => {
      try {
        const response = await fetch(`/api/outfall-types/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch outfall type');
        }
        const data = await response.json();
        setOutfallType(data);
      } catch (error) {
        console.error('Error fetching outfall type:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOutfallType();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!outfallType) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Outfall Type not found</div>
      </div>
    );
  }

  const handleSave = async (updatedOutfallType: any) => {
    try {
      const response = await fetch(`/api/outfall-types/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOutfallType),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update outfall type');
      }

      const data = await response.json();
      setOutfallType(data);
    } catch (error) {
      console.error('Error updating outfall type:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <DetailView
        entityType="outfall-types"
        record={outfallType}
        onSave={handleSave}
      />
    </div>
  );
}
