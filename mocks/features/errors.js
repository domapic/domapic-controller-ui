const { base } = require("./base");

const { getLogsError } = require("./fixtures/logs/get");

const logsError = base.extend([getLogsError]);

module.exports = {
  logsError
};
