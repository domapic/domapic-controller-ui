const { base } = require("./base");

const {
  getModulesUnauth,
  getModule1Unauth,
  getModule2Unauth
} = require("./fixtures/services/get");

const unauthenticated = base.extend([getModulesUnauth, getModule1Unauth, getModule2Unauth]);

module.exports = {
  unauthenticated
};
