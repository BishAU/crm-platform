'use client';

import { useEntityData } from '@lib/hooks';

interface MarketingList {
  id: string;
  // Add other fields as needed
}

export default function MarketingListPage() {
  const { data: list, error } = useEntityData<MarketingList>({
    endpoint: '/api/marketing/lists',
    errorMessage: 'Failed to fetch marketing list'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Marketing List {list.id}</h1>
      {/* Add your marketing list display here */}
    </div>
  );
}