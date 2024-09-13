module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  testMatch: ["<rootDir>/tests/*.test.js"],

  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/tests/setupTests.js"],
};
