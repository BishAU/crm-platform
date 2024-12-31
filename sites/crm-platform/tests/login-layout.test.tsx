import { render, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginLayout from '../app/login/layout';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginLayout', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders children when no session exists', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    const { getByText } = render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('redirects to dashboard when session exists', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    );

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('applies correct background styles', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    const { container } = render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    );

    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass('min-h-screen', 'bg-gradient-to-b', 'from-blue-50', 'to-blue-100');
  });

  it('maintains layout structure during loading state', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    });

    const { getByText } = render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});