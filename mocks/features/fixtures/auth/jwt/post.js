const createAccessTokenSuccess = {
  url: "/api/auth/jwt",
  method: "POST",
  response: {
    status: 200,
    body: {
      accessToken: "foo-access-token",
      refreshToken: "foo-refresh-token"
    }
  }
};

module.exports = {
  createAccessTokenSuccess
};
