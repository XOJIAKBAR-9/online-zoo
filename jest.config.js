/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    // Map paths like '../data/translations.js' to the `.ts` counterpart for Jest
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
