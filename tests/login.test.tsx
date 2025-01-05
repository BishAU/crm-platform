import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../app/login/page';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    // Ensure router.push is mocked
    mockRouter.push.mockImplementation(() => Promise.resolve());
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockSignInResult = {
      error: null,
      url: '/dashboard',
    };

    (signIn as jest.Mock).mockResolvedValueOnce(mockSignInResult);

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', expect.objectContaining({
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
        callbackUrl: '/dashboard'
      }));
    });

    // Verify router.push was called with the correct URL
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });

    // Should not show error message
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('handles failed login', async () => {
    const mockSignInResult = {
      error: 'Invalid email or password',
      url: null,
    };

    (signIn as jest.Mock).mockResolvedValueOnce(mockSignInResult);

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    (signIn as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Signing in...');
  });

  it('handles network errors', async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('An error occurred during login')).toBeInTheDocument();
    });
  });
});