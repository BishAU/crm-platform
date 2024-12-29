'use client';

import React from 'react';
import { Button } from '../../../../components/ui/Button';
import { Card } from '../../../../components/ui/Card';

interface ListCreatorProps {
  edmId: string;
  children?: React.ReactNode;
}

export default function ListCreator({ edmId, children }: ListCreatorProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [preview, setPreview] = React.useState<any[]>([]);

  const handlePreview = async () => {
    try {
      const response = await fetch(`/api/marketing/lists/preview?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setPreview(data);
    } catch (error) {
      console.error('Error previewing list:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/marketing/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          edmId,
          query,
        }),
      });
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        {children || 'Create List'}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl">
        <Card.Header>
          <Card.Title>Create Recipient List</Card.Title>
          <Card.Description>
            Create a list of recipients based on your query
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Query
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your query here..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handlePreview}>
                Preview
              </Button>
              <Button onClick={handleCreate}>
                Create List
              </Button>
            </div>
            {preview.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-medium">Preview ({preview.length} recipients)</h4>
                <div className="max-h-60 overflow-auto rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {preview.map((recipient, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-6 py-4">
                            {recipient.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {recipient.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
