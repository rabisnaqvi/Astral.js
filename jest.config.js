module.exports = {
  testEnvironment: 'jsdom', // Use Node.js environment for running tests
  roots: ['<rootDir>/specs'], // Specify the root directory for tests
  moduleDirectories: ['node_modules', 'src'], // Define the directories Jest should look for modules
  moduleFileExtensions: ['js'], // Specify the file extensions of test files
  testMatch: ['**/*.spec.js'], // Pattern for matching test files
  verbose: true, // Output detailed information for each test
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: '<rootDir>/coverage', // Specify the directory for coverage reports
  collectCoverageFrom: ['src/**/*.js'], // Specify the files to include for code coverage
  coverageReporters: ['lcov', 'text-summary'], // Define the coverage report formats
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
