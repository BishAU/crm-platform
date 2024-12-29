'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import DetailView from '../../components/DetailView';

export default function MarketingDetailPage() {
  const params = useParams();
  const { id } = params;
  const [record, setRecord] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch record data here based on the ID
    // For now, use a placeholder
    const fetchRecord = async () => {
      setLoading(true);
      try {
        // Replace this with actual data fetching logic
        const mockRecord = {
          id: id,
          name: 'Marketing ' + id,
          type: 'Some Type',
          description: 'Some Description',
          startDate: '2024-12-27',
        };
        setRecord(mockRecord);
      } catch (error) {
        console.error('Failed to fetch record:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    // Handle save logic here
    console.log('Record saved:', updatedRecord);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!record) {
    return <div>Record not found</div>;
  }

  return (
    <div>
      <DetailView
        entityType="marketing"
        record={record}
        onSave={handleSave}
      />
    </div>
  );
}