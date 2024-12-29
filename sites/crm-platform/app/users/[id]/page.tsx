'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';
import DetailView from '../../components/DetailView';

interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UserDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const handleSave = async (updatedUser: any) => {
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <DetailView
          entityType="user"
          record={user}
          onSave={handleSave}
        />
      </div>
    </AuthenticatedLayout>
  );
}