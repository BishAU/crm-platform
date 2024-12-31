const mockDate = new Date('2024-01-01T00:00:00Z');

const mockUser = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  image: null,
  createdAt: mockDate,
  updatedAt: mockDate
};

// Track the current test context
let isEmailDuplicationTest = false;

export const mockPrisma = {
  user: {
    findUnique: jest.fn().mockImplementation(({ where }) => {
      if (where.id === 'test-user-id') {
        return Promise.resolve(mockUser);
      }
      return Promise.resolve(null);
    }),
    findFirst: jest.fn().mockImplementation(({ where }) => {
      // For email duplication check
      if (where.email && where.NOT && where.NOT.id) {
        const emailToCheck = where.email;
        const currentUserId = where.NOT.id;
        
        // Return conflicting user only in email duplication test
        if (emailToCheck === 'updated@example.com' && currentUserId === 'test-user-id' && isEmailDuplicationTest) {
          return Promise.resolve({ id: 'other-user' });
        }
      }
      return Promise.resolve(null);
    }),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockImplementation(({ where, data }) => {
      if (where.id === 'test-user-id') {
        // Filter out sensitive fields and ensure image is null if not provided
        const safeData = {
          name: data.name,
          email: data.email,
          image: data.image ?? null
        };

        return Promise.resolve({
          ...mockUser,
          ...safeData,
          updatedAt: mockDate
        });
      }
      return Promise.reject(new Error('User not found'));
    }),
    delete: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

// Reset all mocks before each test
beforeEach(() => {
  Object.values(mockPrisma.user).forEach(mock => {
    if (jest.isMockFunction(mock)) {
      mock.mockClear();
    }
  });
  
  // Set the test context based on the test description
  isEmailDuplicationTest = expect.getState().currentTestName?.includes('prevent email duplication') ?? false;
});

export class PrismaClient {
  constructor() {
    return mockPrisma;
  }
}

export default {
  PrismaClient,
  mockPrisma
};