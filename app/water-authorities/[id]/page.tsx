'use client';

import { useEntityData } from '@lib/hooks';

interface WaterAuthority {
  id: string;
  // Add other fields as needed
}

export default function WaterAuthorityPage() {
  const { data: authority, error } = useEntityData<WaterAuthority>({
    endpoint: '/api/water-authorities',
    errorMessage: 'Failed to fetch water authority'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!authority) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Water Authority {authority.id}</h1>
      {/* Add your water authority display here */}
    </div>
  );
}
