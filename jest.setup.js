import '@testing-library/jest-dom/extend-expect';

// Mock the next router
jest.mock('next/router', () => require('next-router-mock'));

// Needed by useResizeObserver from @mantine/hooks
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock the api "sdk" used in the frontent hooks
jest.mock('@/api', () => ({ getProjects: jest.fn(), getReports: jest.fn() }));

// Mock the prisma client used in api handlers
jest.mock('@/prisma/client', () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
    },
    report: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));
