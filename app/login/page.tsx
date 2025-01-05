'use client';

import { useEffect, useRef } from 'react';
import './styles.css';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const scriptLoaded = useRef(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement('script');
    script.src = '/zoneAnimator.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("InvalidCredentials");
        setLoading(false);
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("UnknownError");
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundImage: 'url(/images/underwater.avif)', backgroundSize: 'cover' }}>
      <div className="zone sky optimize-animation" style={{ position: 'absolute', top: '0%', bottom: '65%' }}></div>
      <div className="zone horizon optimize-animation" style={{ position: 'absolute', top: '50%', bottom: '45%' }}></div>
      <div className="zone underwater optimize-animation" style={{ position: 'absolute', top: '55%', bottom: '5%' }}></div>

      <svg id="cloud-template" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" style={{ display: 'none' }}>
        <path d="M 25 40 C 15 40 5 35 5 25 C 5 15 15 10 25 10 C 25 0 40 0 45 10 C 55 5 70 10 70 20 C 80 15 95 20 95 30 C 95 40 80 45 70 40 C 65 45 55 45 45 40 C 40 45 30 45 25 40"
              fill="#fff" stroke="#e6e6e6" strokeWidth="2" />
      </svg>
      <div className="login-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, padding: '20px 0' }}>
        <div className="login-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Sign in to your account</h2>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="login-input"
              disabled={loading}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              className="login-input"
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
