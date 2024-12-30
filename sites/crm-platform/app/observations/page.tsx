'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import DetailView from '@components/DetailView';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';

interface Observation {
  id: string;
  date: string;
  type: string;
  description: string;
  location: string;
}

export default function ObservationsPage() {
  const [loading, setLoading] = useState(true);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await fetch('/api/observations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setObservations(data);
      } catch (error) {
        console.error('Failed to fetch observations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, []);

  const defaultColumns = [
    { field: 'id', headerName: 'ID', isPrimary: true, active: false, renderCell: (value: any) => {
      return <a href={`/observations/${value.id}`} className="text-ocean-600 hover:text-ocean-800">{value.id}</a>
    } },
    { field: 'date', headerName: 'Date', active: true },
    { field: 'type', headerName: 'Type', active: true },
    { field: 'description', headerName: 'Description', active: false },
    { field: 'location', headerName: 'Location', active: true },
  ];

  // Get the ordered field names from localStorage or use default order
  const orderedFields = getFieldOrder('observations', defaultColumns.map(col => col.field));

  // Reorder columns based on the saved field order
  const columns = orderedFields
    .map(field => defaultColumns.find(col => col.field === field))
    .filter((col): col is typeof defaultColumns[0] => col !== undefined);

  const handleSave = async (record: Record<string, any>) => {
    console.log('Save observation:', record);
    try {
      const response = await fetch(`/api/observations/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedObservation = await response.json();
      setObservations(observations.map(o => o.id === updatedObservation.id ? updatedObservation : o));
    } catch (error) {
      console.error('Failed to save observation:', error);
    }
    setSelectedRecord(null);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Observations</h1>
        <DataGrid
          rows={observations}
          columns={columns}
          entityType="observation"
          onSave={handleSave}
          loading={loading}
        />
        {selectedRecord && (
          <DetailView
            entityType="observation"
            record={selectedRecord}
            onSave={handleSave}
          />
        )}
      </div>
    </AuthenticatedLayout>
  );
}
