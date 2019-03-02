const getConfig = {
  url: "/api/config",
  method: "GET",
  response: {
    status: 200,
    body: {
      color: true,
      logLevel: "info",
      port: 3000,
      authDisabled: ["127.0.0.1", "::1/128"],
      hostName: "",
      db: "mongodb://localhost:27017/domapic",
      sslCert: "/etc/foo/foo-ssl-cert",
      sslKey: "/etc/foo/foo-ssl-key",
      rejectUntrusted: false,
      auth: true
    }
  }
};

module.exports = {
  getConfig
};
