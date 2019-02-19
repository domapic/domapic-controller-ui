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
const { getUser, getUsers } = require("./fixtures/users/get");
const { getUserMe } = require("./fixtures/users/me/get");
const { getConfig } = require("./fixtures/config/get");
const {
  getAbilitiesSuccess,
  getAbilitySuccess,
  getAbility2Success,
  getAbilityState
} = require("./fixtures/abilities/get");
const { abilityActionSuccess } = require("./fixtures/abilities/action/post");
const { getLogsSuccess } = require("./fixtures/logs/get");

const base = new Feature([
  getAboutSuccess,
  createAccessTokenSuccess,
  getModulesSuccess,
  getModule1Success,
  getModule2Success,
  getServicesSuccess,
  getServiceSuccess,
  getUserMe,
  getUsers,
  getUser,
  getConfig,
  getAbilitiesSuccess,
  getAbilitySuccess,
  getAbility2Success,
  getLogsSuccess,
  getAbilityState,
  abilityActionSuccess
]);

module.exports = {
  base
};
