'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';

export default function ObservationPage() {
  const [observation, setObservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await fetch(`/api/observations/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch observation');
        }
        const data = await response.json();
        setObservation(data);
      } catch (error) {
        console.error('Error fetching observation:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchObservation();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!observation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Observation not found</div>
      </div>
    );
  }

  const handleSave = async (updatedObservation: any) => {
    try {
      const response = await fetch(`/api/observations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedObservation),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update observation');
      }

      const data = await response.json();
      setObservation(data);
    } catch (error) {
      console.error('Error updating observation:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <DetailView
        entityType="observations"
        record={observation}
        onSave={handleSave}
      />
    </div>
  );
}
