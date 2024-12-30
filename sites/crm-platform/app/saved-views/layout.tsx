import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Views | Clean Ocean CRM',
  description: 'Access and manage your saved views',
};

export default function SavedViewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}