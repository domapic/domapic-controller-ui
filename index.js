"use strict";

const path = require("path");

const getAbsoluteDistPath = () => path.resolve(__dirname, "dist");

module.exports = {
  getAbsoluteDistPath
}
