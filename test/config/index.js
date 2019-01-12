const applicationHost = process.env.narval_is_docker === "true" ? "application" : "localhost";

module.exports = {
  urls: {
    application: `http://${applicationHost}:3000`
  }
};
