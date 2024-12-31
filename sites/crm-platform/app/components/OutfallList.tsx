'use client';

import { useEffect, useState } from 'react';
import { Outfall } from '@prisma/client';

export default function OutfallList() {
  const [outfalls, setOutfalls] = useState<Outfall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOutfalls() {
      try {
        const response = await fetch('/api/outfalls');
        const data = await response.json();
        setOutfalls(data);
      } catch (error) {
        console.error('Error fetching outfalls:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOutfalls();
  }, []);

  if (loading) {
    return <div>Loading outfalls...</div>;
  }

  return (
    <div className="space-y-4">
      {outfalls.map((outfall) => (
        <div key={outfall.id} className="p-4 border rounded-lg">
          <h3 className="font-semibold">{outfall.outfallName}</h3>
          <div className="text-sm text-gray-600">
            <p>Authority: {outfall.authority}</p>
            <p>Contact: {outfall.contact}</p>
            <p>State: {outfall.state}</p>
          </div>
        </div>
      ))}
    </div>
  );
}