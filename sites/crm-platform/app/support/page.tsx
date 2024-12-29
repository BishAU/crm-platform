'use client';

import DataGrid from '../components/DataGrid';
import { useEffect, useState } from 'react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/support-tickets');
        const data = await response.json();
        setTickets(data.data || []);
      } catch (error) {
        console.error('Error fetching support tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/support-tickets/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update support ticket');
      }

      // Refresh the list
      const refreshResponse = await fetch('/api/support-tickets');
      const refreshData = await refreshResponse.json();
      setTickets(refreshData.data || []);
    } catch (error) {
      console.error('Error updating support ticket:', error);
      throw error;
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', isPrimary: true },
    { field: 'description', headerName: 'Description' },
    { field: 'status', headerName: 'Status' },
    { field: 'priority', headerName: 'Priority' },
    { field: 'assignedTo', headerName: 'Assigned To' },
    { field: 'createdAt', headerName: 'Created At' },
    { field: 'updatedAt', headerName: 'Updated At' },
  ];

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Support Tickets</h1>
      <DataGrid
        rows={tickets}
        columns={columns}
        entityType="supportTicket"
        onSave={handleSave}
        loading={loading}
      />
      </div>
    </AuthenticatedLayout>
  );
}
