'use client';

import { useEntityData } from '@lib/hooks';

interface Observation {
  id: string;
  // Add other fields as needed
}

export default function ObservationPage() {
  const { data: observation, error } = useEntityData<Observation>({
    endpoint: '/api/observations',
    errorMessage: 'Failed to fetch observation'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!observation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Observation {observation.id}</h1>
      {/* Add your observation display here */}
    </div>
  );
}
