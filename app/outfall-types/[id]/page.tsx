'use client';

import { useEntityData } from '@lib/hooks';

interface OutfallType {
  id: string;
  // Add other fields as needed
}

export default function OutfallTypePage() {
  const { data: outfallType, error } = useEntityData<OutfallType>({
    endpoint: '/api/outfall-types',
    errorMessage: 'Failed to fetch outfall type'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!outfallType) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Outfall Type {outfallType.id}</h1>
      {/* Add your outfall type display here */}
    </div>
  );
}
