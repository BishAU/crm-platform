'use client';

import { useState } from 'react';
import './new-styles.css';
import Logo from '../../components/Logo';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function NewLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const emailElement = e.currentTarget.elements.namedItem('email');
    const passwordElement = e.currentTarget.elements.namedItem('password');

    const email = emailElement && 'value' in emailElement ? emailElement.value : '';
    const password = passwordElement && 'value' in passwordElement ? passwordElement.value : '';

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      alert('Login failed');
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
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}