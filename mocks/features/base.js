const { Feature } = require("../server");

const { getAboutSuccess } = require("./fixtures/about/get");
const { createAccessTokenSuccess } = require("./fixtures/auth/jwt/post");
const {
  getModulesSuccess,
  getModule1Success,
  getModule2Success,
  getServicesSuccess,
  getServiceSuccess
} = require("./fixtures/services/get");
const { getUser } = require("./fixtures/users/get");
const { getUserMe } = require("./fixtures/users/me/get");

const base = new Feature([
  getAboutSuccess,
  createAccessTokenSuccess,
  getModulesSuccess,
  getModule1Success,
  getModule2Success,
  getServicesSuccess,
  getServiceSuccess,
  getUserMe,
  getUser
]);

module.exports = {
  base
};
