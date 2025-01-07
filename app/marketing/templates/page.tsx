'use client';

import { useState, useEffect } from 'react';
import { listDesigns } from '../../../lib/sendgrid';

interface Template {
  id: string;
  name: string;
  description: string;
}

interface DesignsResponse {
  designs: Template[];
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await listDesigns() as DesignsResponse;
        if (response) {
          setTemplates(response.designs);
        } else {
          setError('Failed to fetch templates');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>SendGrid Templates</h1>
      {templates.length === 0 ? (
        <div>No templates found.</div>
      ) : (
        <ul>
          {templates.map((template) => (
            <li key={template.id}>
              <h2>{template.name}</h2>
              <p>{template.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}