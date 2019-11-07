module.exports = {
  rootDir: "./src",
  roots: ["<rootDir>/../test"],
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  globalTeardown: "<rootDir>/../test/teardown.ts",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/index.ts",
    "<rootDir>/utils/graceful.ts",
    "<rootDir>/utils/errorHandler.ts",
    "<rootDir>/database"
  ],
  testEnvironment: "node"
};
