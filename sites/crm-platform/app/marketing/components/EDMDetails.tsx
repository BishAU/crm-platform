import React from 'react';
import { Card } from '../../../components/ui/Card';

interface EDMDetailsProps {
  edm: {
    id: string;
    name: string;
    subject: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function EDMDetails({ edm }: EDMDetailsProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>EDM Details</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Name</h4>
            <p className="text-gray-600">{edm.name}</p>
          </div>
          <div>
            <h4 className="font-medium">Subject</h4>
            <p className="text-gray-600">{edm.subject}</p>
          </div>
          <div>
            <h4 className="font-medium">Content</h4>
            <div className="mt-2 rounded-md border p-4">
              <div dangerouslySetInnerHTML={{ __html: edm.content }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Created At</h4>
              <p className="text-gray-600">
                {new Date(edm.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Last Updated</h4>
              <p className="text-gray-600">
                {new Date(edm.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
