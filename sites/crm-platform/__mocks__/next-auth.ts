const nextAuth = jest.fn();

export default nextAuth;

export const getServerSession = jest.fn().mockResolvedValue({
  user: {
    id: 'mock-user-id',
    email: 'test@example.com',
    name: 'Test User',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

export const getSession = jest.fn().mockResolvedValue({
  user: {
    id: 'mock-user-id',
    email: 'test@example.com',
    name: 'Test User',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});