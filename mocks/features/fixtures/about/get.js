const getAboutSuccess = {
  url: "/api/about",
  method: "GET",
  response: {
    status: 200,
    body: {
      name: "domapic-controller",
      type: "controller",
      package: "domapic-controller",
      version: "1.0.0-beta.1",
      description: "Controller for Domapic systems",
      author: "Javier Brea",
      license: "MIT",
      homepage: "http://domapic.com"
    }
  }
};

module.exports = {
  getAboutSuccess
};
