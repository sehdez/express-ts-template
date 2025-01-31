import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  setupFiles: ['<rootDir>/setupTest.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/config/'],
};

export default config;
