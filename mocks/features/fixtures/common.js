const authErrorResponse = {
  status: 401,
  body: {
    statusCode: 401,
    error: "Not authorized",
    message: "Not authorized"
  }
};

module.exports = {
  authErrorResponse
};
