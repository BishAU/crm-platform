'use client';

import { useEntityData } from '@lib/hooks';

interface SupportTicket {
  id: string;
  // Add other fields as needed
}

export default function SupportTicketPage() {
  const { data: ticket, error } = useEntityData<SupportTicket>({
    endpoint: '/api/support',
    errorMessage: 'Failed to fetch support ticket'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Support Ticket {ticket.id}</h1>
      {/* Add your support ticket display here */}
    </div>
  );
}
