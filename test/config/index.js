const DOCKER_HOST = "application-container";
const LOCAL_HOST = "localhost";
const IS_DOCKER = process.env.narval_is_docker === "true";

const applicationHost = IS_DOCKER ? DOCKER_HOST : LOCAL_HOST;

module.exports = {
  urls: {
    application: `http://${applicationHost}:3000`
  }
};
