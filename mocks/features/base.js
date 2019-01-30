const { Feature } = require("../server");

const { getAboutSuccess } = require("./fixtures/about/get");
const { createAccessTokenSuccess } = require("./fixtures/auth/jwt/post");
const {
  getModulesSuccess,
  getModule1Success,
  getModule2Success
} = require("./fixtures/services/get");

const base = new Feature([
  getAboutSuccess,
  createAccessTokenSuccess,
  getModulesSuccess,
  getModule1Success,
  getModule2Success
]);

module.exports = {
  base
};
