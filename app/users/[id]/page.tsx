'use client';

import { useEntityData } from '@lib/hooks';

interface User {
  id: string;
  email: string;
  name: string | null;
  // Add other fields as needed
}

export default function UserPage() {
  const { data: user, error } = useEntityData<User>({
    endpoint: '/api/users',
    errorMessage: 'Failed to fetch user'
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <h2>{user.name || 'Unnamed User'}</h2>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}