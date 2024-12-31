import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import AuthenticatedLayout from '../app/components/AuthenticatedLayout';
import { sidebarConfig } from '../app/components/sidebarConfig';
const { mainNav: menuItems } = sidebarConfig;
import { useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    usePathname: jest.fn(() => '/dashboard'),
}));

describe('Sidebar Navigation', () => {
  const renderWithSession = (session: Session | null = null) => {
    return render(
      <SessionProvider session={session}>
        <AuthenticatedLayout><div /></AuthenticatedLayout>
      </SessionProvider>
    );
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders all sidebar links when not collapsed', () => {
    renderWithSession({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/avatar.jpg'
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    
    // Ensure sidebar is not collapsed
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-64');
    
    menuItems.forEach((item) => {
      const link = screen.getByText(item.name);
      expect(link).toBeInTheDocument();
    });
  });

  it('navigates to the correct page when a link is clicked', () => {
    renderWithSession({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com'
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString()
    });
    menuItems.forEach((item) => {
      const link = screen.getByRole('link', { name: `${item.icon} ${item.name} ▾` });
      expect(link).toHaveAttribute('href', item.href);
    });
  });

  it('redirects to login when user is not authenticated', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    
    renderWithSession(null);
    
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    }, { timeout: 5000 });
  });

  it('redirects to dashboard when authenticated user accesses root', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (usePathname as jest.Mock).mockReturnValue('/');
    
    renderWithSession({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com'
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString()
    });
    
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('maintains sidebar on all linked pages', async () => {
    renderWithSession({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com'
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString()
    });

    // Test each sidebar link
    for (const item of menuItems) {
      // Mock the pathname for the current link
      (usePathname as jest.Mock).mockReturnValue(item.href);
      
      // Verify sidebar is present
      const sidebar = screen.getByRole('complementary');
      expect(sidebar).toBeInTheDocument();
      
      // Verify the active link is highlighted
      // Mock the pathname for the current link
      (usePathname as jest.Mock).mockReturnValue(item.href);
      
      // Verify the active link is highlighted
      const activeLink = screen.getByRole('link', {
        name: new RegExp(`${item.icon} ${item.name} [▾▴]`)
      });
      expect(activeLink).toHaveClass('bg-[#005f9e]');
    }
  });

  it('logs out user when sign out is clicked', async () => {
    const signOutMock = jest.fn();
    jest.spyOn(require('next-auth/react'), 'signOut').mockImplementation(signOutMock);
    
    renderWithSession({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com'
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString()
    });
    
    // Find and click sign out directly
    const signOutButton = screen.getByRole('button', { name: 'Sign out' });
    fireEvent.click(signOutButton);
    
    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: '/login' });
    });
  });
});