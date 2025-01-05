'use client';

import { useEntityData } from '@lib/hooks';

interface Politician {
  id: string;
  // Add other fields as needed
}

export default function PoliticianPage() {
  const { data: politician, error } = useEntityData<Politician>({
    endpoint: '/api/politicians',
    errorMessage: 'Failed to fetch politician'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!politician) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Politician {politician.id}</h1>
      {/* Add your politician display here */}
    </div>
  );
}
