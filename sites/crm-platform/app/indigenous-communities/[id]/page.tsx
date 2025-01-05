'use client';

import { useEntityData } from '@lib/hooks';

interface IndigenousCommunity {
  id: string;
  // Add other fields as needed
}

export default function IndigenousCommunityPage() {
  const { data: community, error } = useEntityData<IndigenousCommunity>({
    endpoint: '/api/indigenous-communities',
    errorMessage: 'Failed to fetch indigenous community'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Indigenous Community {community.id}</h1>
      {/* Add your indigenous community display here */}
    </div>
  );
}
