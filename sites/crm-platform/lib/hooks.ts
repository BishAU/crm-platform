'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface FetchOptions {
  endpoint: string;
  errorMessage?: string;
}

export function useEntityData<T>(options: FetchOptions) {
  const params = useParams();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params?.id) {
          throw new Error('No ID provided');
        }
        const response = await fetch(`${options.endpoint}?slug=${params.id}`);
        if (!response.ok) {
          throw new Error(options.errorMessage || 'Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchData();
  }, [params?.id, options.endpoint, options.errorMessage]);

  return { data, error };
}