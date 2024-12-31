import { Suspense } from 'react';
import MarketingListsClient from './MarketingListsClient';

export const dynamic = 'force-dynamic';

export default function MarketingListsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    }>
      <MarketingListsClient />
    </Suspense>
  );
}
