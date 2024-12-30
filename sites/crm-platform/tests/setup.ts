import { mockPrisma } from '../__mocks__/@prisma/client';
import { getServerSession } from 'next-auth';

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => Promise.resolve({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com'
    }
  }))
}));

// Mock the prisma module
jest.mock('../app/lib/prisma', () => ({
  prisma: mockPrisma
}));

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  (getServerSession as jest.Mock).mockClear();
});

export { mockPrisma };