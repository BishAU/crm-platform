import React from 'react';
import Link from 'next/link';
import { Card } from '../../../../components/ui/Card';

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Marketing Campaigns</Card.Title>
        <Card.Description>
          {campaigns.length} active campaigns
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/marketing/campaigns/${campaign.id}`}
              className="block"
            >
              <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                  <div className="text-right text-sm text-gray-500">
                    <div>
                      Start: {new Date(campaign.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      End: {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
