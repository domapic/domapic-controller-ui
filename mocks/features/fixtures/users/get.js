const getUser = {
  url: "/api/users/:id",
  method: "GET",
  response: {
    status: 200,
    body: {
      _id: "123123",
      name: "Foo user",
      email: "foo@foo.com",
      role: "admin",
      createdAt: "2018-07-28T17:13:08.718Z",
      updatedAt: "2018-07-28T17:13:09.730Z"
    }
  }
};

module.exports = {
  getUser
};
