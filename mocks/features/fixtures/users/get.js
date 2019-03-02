const user1 = {
  _id: "user-id-1",
  name: "Foo user",
  email: "foo@foo.com",
  role: "admin",
  createdAt: "2018-07-28T17:13:08.718Z",
  updatedAt: "2018-07-28T17:13:09.730Z"
};

const getUsers = {
  url: "/api/users",
  method: "GET",
  response: {
    status: 200,
    body: [
      user1,
      {
        _id: "user-id-2",
        name: "Foo module 1 user",
        role: "module",
        createdAt: "2018-07-28T17:13:08.718Z",
        updatedAt: "2018-07-28T17:13:09.730Z"
      },
      {
        _id: "user-id-3",
        name: "Foo module 2 user",
        role: "module",
        createdAt: "2018-07-28T17:13:08.718Z",
        updatedAt: "2018-07-28T17:13:09.730Z"
      }
    ]
  }
};

const getUser = {
  url: "/api/users/:id",
  method: "GET",
  response: {
    status: 200,
    body: user1
  }
};

module.exports = {
  user1,
  getUsers,
  getUser
};
