const { user1 } = require("../get");

const getUserMe = {
  url: "/api/users/me",
  method: "GET",
  response: {
    status: 200,
    body: user1
  }
};

module.exports = {
  getUserMe
};
