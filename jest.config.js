module.exports = {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globalTeardown: "<rootDir>/test/teardown.ts",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/utils/graceful.ts",
    "src/utils/errorHandler.ts",
    "src/database"
  ],
  testEnvironment: "node"
};
