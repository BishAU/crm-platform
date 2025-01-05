'use client';

import { useEntityData } from '@lib/hooks';

interface Outfall {
  id: string;
  // Add other fields as needed
}

export default function OutfallPage() {
  const { data: outfall, error } = useEntityData<Outfall>({
    endpoint: '/api/outfalls',
    errorMessage: 'Failed to fetch outfall'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!outfall) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Outfall {outfall.id}</h1>
      {/* Add your outfall display here */}
    </div>
  );
}
