const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@/root(.*)$': '<rootDir>/src$1',
    '^@/data(.*)$': '<rootDir>/src/data$1',
    '^@/features(.*)$': '<rootDir>/src/features$1',
    '^@/config(.*)$': '<rootDir>/src/config$1',
    '^@/libs(.*)$': '<rootDir>/src/libs$1',
  },
}

module.exports = createJestConfig(customJestConfig)
