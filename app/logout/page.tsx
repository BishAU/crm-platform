'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all cookies
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Redirect to login page
    router.push('/login');
  }, [router]);

  return null;
}