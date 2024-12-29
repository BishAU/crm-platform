import React from 'react';
import Link from 'next/link';
import { Card } from '../../../../components/ui/Card';

interface EDM {
  id: string;
  name: string;
  subject: string;
  status: string;
  sentAt?: string;
}

interface EDMListProps {
  campaignId: string;
  edms: EDM[];
}

export default function EDMList({ campaignId, edms }: EDMListProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Email Templates</Card.Title>
        <Card.Description>
          {edms.length} templates in this campaign
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {edms.map((edm) => (
            <Link
              key={edm.id}
              href={`/marketing/campaigns/${campaignId}/edm/${edm.id}`}
              className="block"
            >
              <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">{edm.name}</h4>
                  <p className="text-sm text-gray-600">{edm.subject}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    edm.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {edm.status}
                  </span>
                  {edm.sentAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(edm.sentAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
