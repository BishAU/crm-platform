import React from 'react';
import { Card } from '../../../../components/ui/Card';

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface CampaignDetailsProps {
  campaign: Campaign;
}

export default function CampaignDetails({ campaign }: CampaignDetailsProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Campaign Details</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Name</h4>
            <p className="text-gray-600">{campaign.name}</p>
          </div>
          <div>
            <h4 className="font-medium">Description</h4>
            <p className="text-gray-600">{campaign.description}</p>
          </div>
          <div>
            <h4 className="font-medium">Status</h4>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {campaign.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Start Date</h4>
              <p className="text-gray-600">
                {new Date(campaign.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium">End Date</h4>
              <p className="text-gray-600">
                {new Date(campaign.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
