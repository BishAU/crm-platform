"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import "./styles.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const error = searchParams?.get("error");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        // If there's an error, NextAuth will redirect back with error param
        router.push("/login?error=InvalidCredentials");
      } else {
        // Successful login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      router.push("/login?error=UnknownError");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign in to your account</h2>
        {error && (
          <p className="error-message">
            {error === "InvalidCredentials" 
              ? "Invalid email or password"
              : "An error occurred. Please try again."}
          </p>
        )}
        <form onSubmit={handleSubmit}>
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
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}
