'use client';

import { useEffect, useState } from 'react';
import DetailView from '@components/DetailView';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

export default function WaterAuthorityPage() {
  const [waterAuthority, setWaterAuthority] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchWaterAuthority = async () => {
      try {
        const response = await fetch(`/api/water-authorities/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch water authority');
        }
        const data = await response.json();
        setWaterAuthority(data);
      } catch (error) {
        console.error('Error fetching water authority:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWaterAuthority();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!waterAuthority) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Water Authority not found</div>
      </div>
    );
  }

  const handleSave = async (updatedWaterAuthority: any) => {
    try {
      const response = await fetch(`/api/water-authorities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWaterAuthority),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update water authority');
      }

      const data = await response.json();
      setWaterAuthority(data);
    } catch (error) {
      console.error('Error updating water authority:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex-1 p-8">
        <DetailView
          entityType="waterAuthority"
          record={waterAuthority}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}
