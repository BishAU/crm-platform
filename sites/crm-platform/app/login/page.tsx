import { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getToken } from 'next-auth/jwt';
import LoginClient from './LoginClient';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  // Check for active session
  const headersList = headers();
  const token = await getToken({
    req: {
      headers: Object.fromEntries(headersList.entries()),
      cookies: headersList.get('cookie')?.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>) ?? {},
    } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to dashboard if session exists
  if (token) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
          </div>
        }
      >
        <LoginClient />
      </Suspense>
    </div>
  );
}
