'use client';

import { useState } from 'react';
import './styles.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    // setTimeout(() => {
    //   setLoading(false);
    //   alert('Logged in!');
    // }, 1000);
      setLoading(false);
      alert('Logged in!');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <img src="/images/cof_logo.png" alt="cof logo" className="login-logo" />
          <h2>Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
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