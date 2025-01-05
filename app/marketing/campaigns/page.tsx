'use client';

import AuthenticatedLayout from '@components/AuthenticatedLayout';
import ParallaxScene from '../../../components/ParallaxScene';

export default function MarketingCampaignsPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Marketing Campaigns</h1>
        <p>This page will allow you to create and manage marketing campaigns.</p>
        <div style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
            <ParallaxScene />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}