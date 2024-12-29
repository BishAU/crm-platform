'use client';

import { useState, useEffect } from 'react';
import DataGrid from '../components/DataGrid';

interface OutfallType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    isPrimary: true,
  },
  {
    field: 'description',
    headerName: 'Description',
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    active: false
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    active: false
  },
  {
    field: 'id',
    headerName: 'ID',
    active: false
  },
];

import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function OutfallTypesPage() {
  const [rows, setRows] = useState<OutfallType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutfallTypes();
  }, []);

  const fetchOutfallTypes = async () => {
    try {
      const response = await fetch('/api/outfall-types');
      if (!response.ok) {
        throw new Error('Failed to fetch outfall types');
      }
      const data = await response.json();
      setRows(data.data || []);
    } catch (error) {
      console.error('Error fetching outfall types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/outfall-types/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update outfall type');
      }

      const updatedOutfallType = await response.json() as OutfallType;

      // Update the local state
      setRows(prev =>
        prev.map(row =>
          row.id === updatedOutfallType.id ? updatedOutfallType : row
        )
      );
    } catch (error) {
      console.error('Error updating outfall type:', error);
      throw error;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Outfall Types</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        entityType="outfallType"
        onSave={handleSave}
        loading={loading}
      />
      </div>
    </AuthenticatedLayout>
  );
}
