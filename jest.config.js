const path = require("path");

module.exports = {
  // setupFiles: ["<rootDir>/setupTest.js"],
  //   testEnvironment: "jest-environment-jsdom",
  preset: "@testing-library/react-native",
  collectCoverage: true,
  //   moduleNameMapper: {
  //     "\\.css$": require.resolve("./test/style-mock.js")
  //   },
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js"
  ],
  setupFilesAfterEnv: [
    "@testing-library/react-native/cleanup-after-each",
    "./setupTest.js"
  ],
  moduleDirectories: ["node_modules", path.resolve(__dirname, "test")],
  testPathIgnorePatterns: [
    "<rootDir>/.expo/",
    "<rootDir>/.expo-shared/",
    "<rootDir>/node_modules/"
  ],
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      lines: 17,
      functions: 19
    }
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
