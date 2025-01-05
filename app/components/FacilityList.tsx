'use client';

import { useEffect, useState } from 'react';
import { Facility } from '@prisma/client';

export default function FacilityList() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const response = await fetch('/api/facilities');
        const data = await response.json();
        setFacilities(data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFacilities();
  }, []);

  if (loading) {
    return <div>Loading facilities...</div>;
  }

  return (
    <div className="space-y-4">
      {facilities.map((facility) => (
        <div key={facility.id} className="p-4 border rounded-lg">
          <h3 className="font-semibold">{facility.suburb || 'Unnamed Facility'}</h3>
          <div className="text-sm text-gray-600">
            <p>Type: {facility.type}</p>
            <p>Postcode: {facility.postcode}</p>
            <p>Sector: {facility.sector}</p>
          </div>
        </div>
      ))}
    </div>
  );
}