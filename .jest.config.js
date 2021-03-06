// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**"],
  // The directory where Jest should output its coverage files
  coverageDirectory: ".coverage",
  // An object that configures minimum threshold enforcement for coverage results
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.js",
    "<rootDir>/src/data-sources/bases"
  ],

  /* coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }, */
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/unit/fileMock.js",
      "\\.(css|less)$": "<rootDir>/mocks/unit/styleMock.js"
  },
  setupFiles: [
    "<rootDir>/src/app/setup/tests.js"
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ]
};
