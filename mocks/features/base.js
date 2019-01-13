const { Feature } = require("../server");

const { getAboutSuccess } = require("./fixtures/about/get");
const { getModulesSuccess } = require("./fixtures/services/get");

const base = new Feature([getAboutSuccess, getModulesSuccess]);

module.exports = {
  base
};
