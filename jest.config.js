const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  moduleNameMapper: {
    '^@/root(.*)$': '<rootDir>/src$1',
    '^@/data(.*)$': '<rootDir>/src/data$1',
    '^@/features(.*)$': '<rootDir>/src/features$1',
    '^@/config(.*)$': '<rootDir>/src/config$1',
    '^@/libs(.*)$': '<rootDir>/src/libs$1',
    '^@/mocks(.*)$': '<rootDir>/src/mocks$1',
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/pages(.*)$': '<rootDir>/src/pages$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@/constants(.*)$': '<rootDir>/src/constants$1',
    '^@/utils(.*)$': '<rootDir>/src/utils$1',
    '^@/layouts(.*)$': '<rootDir>/src/layouts$1',
    '^@/stores(.*)$': '<rootDir>/src/stores$1',
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/setup.ts'],
}

module.exports = createJestConfig(customJestConfig)
