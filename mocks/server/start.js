"use strict";

const Boom = require("boom");

const Cli = require("./Cli");
const options = require("./common/options");
const tracer = require("./common/tracer");

const start = async () => {
  try {
    await new Cli(options.get()).start();
  } catch (error) {
    if (Boom.isBoom(error)) {
      tracer.error(error.message);
    } else {
      console.log(error);
    }
    process.exit(1);
  }
};

module.exports = {
  start
};
