'use client';

import { useEntityData } from '@lib/hooks';

interface Facility {
  id: string;
  // Add other fields as needed
}

export default function FacilityPage() {
  const { data: facility, error } = useEntityData<Facility>({
    endpoint: '/api/facilities',
    errorMessage: 'Failed to fetch facility'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Facility {facility.id}</h1>
      {/* Add your facility display here */}
    </div>
  );
}
