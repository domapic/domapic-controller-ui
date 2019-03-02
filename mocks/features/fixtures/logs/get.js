const logs = [
  {
    _id: "5c37f4cbc0acb663ef64e330",
    _ability: "ability-id-1",
    type: "event",
    data: false,
    createdAt: "2019-01-11T01:43:39.493Z"
  },
  {
    _id: "5c381289c0acb663ef64e331",
    _ability: "ability-id-1",
    type: "event",
    data: false,
    createdAt: "2019-01-11T03:50:33.160Z"
  },
  {
    _id: "5c381297c0acb663ef64e332",
    _ability: "ability-id-1",
    type: "event",
    data: false,
    createdAt: "2019-01-11T03:50:47.062Z"
  },
  {
    _id: "5c381298c0acb663ef64e333",
    _ability: "ability-id-1",
    type: "event",
    data: false,
    createdAt: "2019-01-11T03:50:48.079Z"
  },
  {
    _id: "5c3812eac0acb663ef64e334",
    _ability: "ability-id-2",
    type: "event",
    data: false,
    createdAt: "2019-01-11T03:52:10.827Z"
  },
  {
    _id: "5c5b2c4eb8f9f4a654776902",
    _ability: "ability-id-2",
    type: "action",
    createdAt: "2019-02-06T18:49:50.265Z"
  },
  {
    _id: "5c5b2c4eb8f9f4a654776903",
    _ability: "ability-id-2",
    type: "event",
    createdAt: "2019-02-06T18:49:50.296Z"
  },
  {
    _id: "5c3812eac0acb663efqweqwe",
    _ability: "ability-id-2",
    type: "event",
    data: false,
    createdAt: "2019-01-11T03:52:10.827Z"
  },
  {
    _id: "5c5b2c4eb8f9f4a6547asd",
    _ability: "ability-id-2",
    type: "action",
    createdAt: "2019-02-06T18:49:50.265Z"
  },
  {
    _id: "5c5b2c4eb8f9f4a65473ewre",
    _ability: "ability-id-2",
    type: "event",
    createdAt: "2019-02-06T18:49:50.296Z"
  }
];

const getLogsSuccess = {
  url: "/api/logs",
  method: "GET",
  response: {
    status: 200,
    body: logs
  }
};

const getLogsError = {
  url: "/api/logs",
  method: "GET",
  response: {
    status: 500,
    body: {
      statusCode: 500,
      error: "Internal server error",
      message: "Internal server error"
    }
  }
};

const countLogsSuccess = {
  url: "/api/logs/stats",
  method: "GET",
  response: {
    status: 200,
    body: {
      total: 100
    }
  }
};

module.exports = {
  getLogsSuccess,
  getLogsError,
  countLogsSuccess
};
