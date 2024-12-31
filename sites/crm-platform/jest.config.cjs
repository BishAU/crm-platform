const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Load setup files in the correct order
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases
    '^@lib/api$': '<rootDir>/__mocks__/app/lib/api.ts',
    '^@lib/(.*)$': '<rootDir>/app/lib/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
    // Mock problematic ES modules
    '^uuid$': '<rootDir>/__mocks__/uuid.ts',
    '^next-auth$': '<rootDir>/__mocks__/next-auth.ts',
    '^next-auth/(.*)$': '<rootDir>/__mocks__/next-auth.ts',
    '^next/server$': '<rootDir>/__mocks__/next/server.ts'
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
    '<rootDir>/tests/**/*.test.tsx'
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/_*.{js,jsx,ts,tsx}',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  // Ensure proper module resolution
  moduleDirectories: ['node_modules', '<rootDir>'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);