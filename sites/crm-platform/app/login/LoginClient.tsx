'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession, getCsrfToken } from 'next-auth/react';
import WavesBackground from '../components/WavesBackground';
import CloudsBackground from '../components/CloudsBackground';
import Logo from '../../components/Logo';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get CSRF token
      const csrfToken = await getCsrfToken();
      
      const result = await signIn('credentials', {
        email,
        password,
        csrfToken,
        redirect: false,
        callbackUrl,
      });

      if (!result) {
        throw new Error('Authentication failed');
      }

      if (result.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password');
        } else {
          setError(result.error);
        }
      } else if (result.url) {
        router.push(result.url);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <WavesBackground />
      <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center space-y-4">
          <Logo variant="dark" className="justify-center" />
          <div>
            <h1 className="text-3xl font-bold text-ocean-900">Welcome Back</h1>
            <p className="mt-2 text-ocean-600">Sign in to your account</p>
          </div>
          <a
            href="https://cleanocean.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-ocean-600 hover:text-ocean-700 font-medium text-sm"
          >
            Visit Clean Ocean Foundation ↗
          </a>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ocean-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-ocean-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ocean-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-ocean-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
