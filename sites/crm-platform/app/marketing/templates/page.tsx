'use client';

import { useState, useEffect } from 'react';
import DataGrid from '../../components/DataGrid';

interface Template {
  id: string;
  name: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/marketing/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', isPrimary: true },
    { field: 'name', headerName: 'Name' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'createdAt', headerName: 'Created At' },
    { field: 'updatedAt', headerName: 'Updated At' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Email Templates</h1>
      <DataGrid
        rows={templates}
        columns={columns}
        entityType="template"
        onSave={async (record) => {
          console.log('Save template:', record);
        }}
        loading={loading}
      />
    </div>
  );
}