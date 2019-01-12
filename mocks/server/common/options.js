"use strict";

const commander = require("commander");
const { omitBy, isUndefined } = require("lodash");

const defaultOptions = {
  port: 3100,
  host: "0.0.0.0",
  log: "info",
  feature: null,
  delay: 0,
  watch: true,
  recursive: true
};

const get = () => {
  const userOptions = commander
    .option("--host <host>", "Host for server")
    .option("--port <port>", "Port for server", parseInt)
    .option("--log <log>", "Log level")
    .option("--feature <feature>", "Define current feature")
    .option("--delay <delay>", "Define delay time")
    .option("--features <features>", "Define folder from which load features")
    .option("--watch", "Log level", Boolean)
    .option("--recursive", "Load features recursively", Boolean)
    .parse(process.argv);

  return {
    ...defaultOptions,
    ...omitBy(
      {
        port: userOptions.port,
        host: userOptions.host,
        log: userOptions.log,
        feature: userOptions.feature,
        delay: userOptions.delay,
        features: userOptions.features,
        watch: userOptions.watch,
        recursive: userOptions.recursive
      },
      isUndefined
    )
  };
};

module.exports = {
  get,
  defaultOptions
};
