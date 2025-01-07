'use client';

import { useState } from 'react';
import './new-styles.css';
import Logo from '../../components/Logo';
import { signIn } from 'next-auth/react';

export default function NewLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const emailElement = e.currentTarget.elements.namedItem('email');
    const passwordElement = e.currentTarget.elements.namedItem('password');

    const email = emailElement && 'value' in emailElement ? emailElement.value : '';
    const password = passwordElement && 'value' in passwordElement ? passwordElement.value : '';

    try {
      console.log('Attempting sign in...');
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.ok) {
        console.log('Sign in successful, redirecting to dashboard...');
        // Use window.location for a full page navigation
        window.location.href = '/dashboard';
      } else {
        console.error('Sign in failed:', result?.error);
        setError(result?.error || 'Login failed');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-login-page">
      <div className="new-login-container">
        <div className="new-login-form">
          <div style={{textAlign: 'center'}}>
            <Logo className="new-login-logo" variant="dark" />
            <div className="font-bold text-2xl">Clean Ocean Foundation</div>
            <h2>Sign in to your account</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="new-login-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="new-login-input"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}