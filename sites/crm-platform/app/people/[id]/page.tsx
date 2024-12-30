'use client';

import { useEffect, useState } from 'react';
import DetailView from '@components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function PersonPage() {
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await fetch(`/api/people/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch person');
        }
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPerson();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Person not found</div>
      </div>
    );
  }

  const handleSave = async (updatedPerson: any) => {
    try {
      const response = await fetch(`/api/people/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPerson),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update person');
      }

      const data = await response.json();
      setPerson(data);
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex-1 p-8">
        <DetailView
          entityType="people"
          record={person}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}
