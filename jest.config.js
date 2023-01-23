const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/root(.*)$': '<rootDir>/src$1',
    '^@/data(.*)$': '<rootDir>/src/data$1',
  },
}

module.exports = createJestConfig(customJestConfig)
