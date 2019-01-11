const baseConfig = require("./base/config");

const parseForWebpackDefinePlugin = envVars => {
  const finalConfig = {};

  Object.keys(envVars).forEach(envVarKey => {
    finalConfig[`process.env.${envVarKey}`] = JSON.stringify(envVars[envVarKey]);
  });
  return finalConfig;
};

module.exports = env => {
  const config = require(`./${env}/config`);
  const configuration = {
    ...baseConfig,
    ...config
  };

  return {
    ...configuration,
    webpackDefinePlugin: parseForWebpackDefinePlugin(configuration)
  };
};
