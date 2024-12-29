'use client';

import { useEffect, useState } from 'react';
import DetailView from '../../components/DetailView';
import { useParams } from 'next/navigation';

export default function SupportTicketPage() {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/support-tickets/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch support ticket');
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error('Error fetching support ticket:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTicket();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-500">Support Ticket not found</div>
      </div>
    );
  }

  const handleSave = async (updatedTicket: any) => {
    try {
      const response = await fetch(`/api/support-tickets/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update support ticket');
      }

      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.error('Error updating support ticket:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <DetailView
        entityType="support-tickets"
        record={ticket}
        onSave={handleSave}
      />
    </div>
  );
}
