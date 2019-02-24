const packageInfo = require("../../package.json");

module.exports = {
  VERSION: packageInfo.version,
  SEMANTIC_VERSION: packageInfo.devDependencies["semantic-ui-css"],
  STATICS_ROUTE: "/",
  BASE_ROUTE: "/"
};
