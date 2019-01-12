const { Feature } = require("../server");

const { getAboutSuccess } = require("./fixtures/about/get");

const base = new Feature([getAboutSuccess]);

module.exports = {
  base
};
