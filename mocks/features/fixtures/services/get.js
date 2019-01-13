const getModulesSuccess = {
  url: "/api/services?type=module",
  method: "GET",
  response: {
    status: 200,
    body: [
      {
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
      },
      {
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
      }
    ]
  }
};

module.exports = {
  getModulesSuccess
};
