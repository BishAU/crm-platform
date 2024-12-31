'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MarketingListPage() {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`/api/marketing/lists/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch marketing list');
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error('Error fetching marketing list:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchList();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!list) {
    return <div>Marketing list not found</div>;
  }

  return (
    <div>
      <h1>Marketing List Details</h1>
      <p>ID: {list.id}</p>
      {/* Add more details here based on the actual list data structure */}
    </div>
  );
}