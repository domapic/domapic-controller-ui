const { authErrorResponse } = require("../common");

const module_1 = {
  _id: "module-id-1",
  processId: "tj4d5wqPtrRmAJw85D7p2gM4WLpUz1cK",
  description: "Domapic module for triggering a webhook",
  package: "webhook-domapic-module",
  version: "1.2.0",
  url: "http://192.168.1.120:3000",
  type: "module",
  name: "gitlab-webhook",
  _user: "user-id-1",
  createdAt: "2018-12-09T10:53:45.556Z",
  updatedAt: "2019-01-06T11:46:36.266Z"
};

const module_2 = {
  _id: "module-id-2",
  processId: "1VYc1LnlyDMHHWvA2VTMKmfmLAjJNzcY",
  description: "Domapic module that handles a 4 way switch made with relays",
  package: "relays-switch-domapic-module",
  version: "1.2.0",
  url: "http://192.168.1.164:3100",
  type: "module",
  name: "relay-module",
  _user: "user-id-2",
  createdAt: "2018-12-31T08:54:13.681Z",
  updatedAt: "2019-01-06T12:10:16.190Z"
};

const getModulesSuccess = {
  url: "/api/services?type=module",
  method: "GET",
  response: {
    status: 200,
    body: [module_1, module_2]
  }
};

const getModulesUnauth = {
  url: "/api/services?type=module",
  method: "GET",
  response: (req, res) => {
    if (req.headers.authorization || req.headers["x-api-key"]) {
      res.status(200);
      res.send([module_1, module_2]);
    } else {
      res.status(authErrorResponse.status);
      res.send(authErrorResponse.body);
    }
  }
};

const getModule1Success = {
  url: "/api/services/module-id-1",
  method: "GET",
  response: {
    status: 200,
    body: module_1
  }
};

const getModule1Unauth = {
  url: "/api/services/module-id-1",
  method: "GET",
  response: authErrorResponse
};

const getModule2Success = {
  url: "/api/services/module-id-2",
  method: "GET",
  response: {
    status: 200,
    body: module_2
  }
};

const getModule2Unauth = {
  url: "/api/services/module-id-2",
  method: "GET",
  response: authErrorResponse
};

module.exports = {
  getModulesSuccess,
  getModulesUnauth,
  getModule1Success,
  getModule1Unauth,
  getModule2Success,
  getModule2Unauth
};
