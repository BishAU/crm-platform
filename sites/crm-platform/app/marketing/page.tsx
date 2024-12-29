'use client';

import { useState, useEffect } from 'react';
import DataGrid from '../components/DataGrid';
import DetailView from '../components/DetailView';

interface Marketing {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function MarketingPage() {
  const [loading, setLoading] = useState(true);
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        const response = await fetch('/api/marketing');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMarketing(data);
      } catch (error) {
        console.error('Failed to fetch marketing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketing();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', isPrimary: true, renderCell: (value: any) => {
      return <a href={`/marketing/${value.id}`} className="text-ocean-600 hover:text-ocean-800">{value.id}</a>
    } },
    { field: 'name', headerName: 'Name' },
    { field: 'type', headerName: 'Type' },
    { field: 'status', headerName: 'Status' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
  ];

  const handleSave = async (record: Record<string, any>) => {
    console.log('Save marketing:', record);
    try {
      const response = await fetch(`/api/marketing/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedMarketing = await response.json();
      setMarketing(marketing.map(m => m.id === updatedMarketing.id ? updatedMarketing : m));
    } catch (error) {
      console.error('Failed to save marketing data:', error);
    }
    setSelectedRecord(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Marketing</h1>
      <DataGrid
        rows={marketing}
        columns={columns}
        entityType="marketing"
        onSave={handleSave}
        loading={loading}
      />
      {selectedRecord && (
        <DetailView
          entityType="marketing"
          record={selectedRecord}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
