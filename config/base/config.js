const packageInfo = require("../../package.json");

module.exports = {
  VERSION: packageInfo.version,
  SEMANTIC_VERSION: packageInfo.devDependencies["semantic-ui-css"],
  SOCKET_IO_VERSION: packageInfo.devDependencies["socket.io"],
  STATICS_ROUTE: "/",
  BASE_ROUTE: "/"
};
