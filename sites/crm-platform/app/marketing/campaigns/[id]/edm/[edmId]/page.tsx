import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
    edmId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Campaign ${resolvedParams.id} - EDM ${resolvedParams.edmId}`,
  };
}

export default async function CampaignEdmPage({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Campaign {resolvedParams.id} - EDM {resolvedParams.edmId}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          Email campaign content will be displayed here.
        </p>
      </div>
    </div>
  );
}
