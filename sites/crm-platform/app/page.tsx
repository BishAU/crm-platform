import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/config';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // Redirect to dashboard if logged in, otherwise to login page
  redirect(session ? '/dashboard' : '/login');
}
