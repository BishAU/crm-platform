'use client';

import DataGrid from '../components/DataGrid';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

interface Politician {
  id: string;
  firstName: string;
  surname: string;
  role: string;
  party: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export default function PoliticiansPage() {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await fetch('/api/politicians');
        const data = await response.json();
        setPoliticians(data.data || []);
      } catch (error) {
        console.error('Error fetching politicians:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticians();
  }, []);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/politicians/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update politician');
      }

      // Refresh the list
      const refreshResponse = await fetch('/api/politicians');
      const refreshData = await refreshResponse.json();
      setPoliticians(refreshData.data || []);
    } catch (error) {
      console.error('Error updating politician:', error);
      throw error;
    }
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Full Name', 
      isPrimary: true,
      renderCell: (row: Politician) => `${row.firstName} ${row.surname}`
    },
    { field: 'role', headerName: 'Role' },
    { field: 'party', headerName: 'Party' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'createdAt', headerName: 'Created At', active: false },
    { field: 'updatedAt', headerName: 'Updated At', active: false },
    { field: 'id', headerName: 'ID', active: false },
  ];

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Politicians</h1>
        <DataGrid
          rows={politicians}
          columns={columns}
          entityType="politician"
          onSave={handleSave}
          loading={loading}
        />
      </div>
    </AuthenticatedLayout>
  );
}
