import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page';
import { useSession } from 'next-auth/react';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    },
    status: 'authenticated',
  })),
}));

describe('Dashboard Page', () => {
  it('renders the dashboard with sidebar links', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/test user/i)).toBeInTheDocument(); // Check for user name
    // Add more specific checks for sidebar links once the structure is clearer
  });
});