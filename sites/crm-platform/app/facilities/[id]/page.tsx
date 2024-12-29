'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';

export default function FacilityPage() {
  const [facility, setFacility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await fetch(`/api/facilities/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch facility');
        }
        const data = await response.json();
        setFacility(data);
      } catch (error) {
        console.error('Error fetching facility:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchFacility();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Facility not found</div>
      </div>
    );
  }

  const handleSave = async (updatedFacility: any) => {
    try {
      const response = await fetch(`/api/facilities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFacility),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update facility');
      }

      const data = await response.json();
      setFacility(data);
    } catch (error) {
      console.error('Error updating facility:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <DetailView
        entityType="facilities"
        record={facility}
        onSave={handleSave}
      />
    </div>
  );
}
