module.exports = {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "/migrations/",
    "/models/",
    "src/index.ts",
    "src/utils/graceful.ts"
  ],
  testEnvironment: "node"
};
