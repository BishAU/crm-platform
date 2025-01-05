'use client';

import { useEntityData } from '@lib/hooks';

interface Person {
  id: string;
  // Add other fields as needed
}

export default function PersonPage() {
  const { data: person, error } = useEntityData<Person>({
    endpoint: '/api/people',
    errorMessage: 'Failed to fetch person'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Person {person.id}</h1>
      {/* Add your person display here */}
    </div>
  );
}
