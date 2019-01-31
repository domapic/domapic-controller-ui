const getUserMe = {
  url: "/api/users/me",
  method: "GET",
  response: {
    status: 200,
    body: {
      _id: "123123",
      name: "Foo user",
      email: "foo-email@foo-domain.com",
      role: "admin",
      createdAt: "2018-07-28T17:13:08.718Z",
      updatedAt: "2018-07-28T17:13:09.730Z"
    }
  }
};

module.exports = {
  getUserMe
};
