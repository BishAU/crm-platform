'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function SupportTicketPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!params?.id) {
          throw new Error('No ID provided');
        }
        setLoading(true);
        const response = await fetch(`/api/support/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch support ticket');
        }
        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [params?.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>No ticket found</div>;
  }

  return (
    <div>
      <h1>Support Ticket {ticket.title}</h1>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Created At: {ticket.createdAt}</p>
      <p>Updated At: {ticket.updatedAt}</p>
    </div>
  );
}
