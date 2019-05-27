module.exports = {
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^utils/(.+)": "<rootDir>/src/utils/$1"
  },
  moduleFileExtensions: ["js", "ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testEnvironment: "node"
};
