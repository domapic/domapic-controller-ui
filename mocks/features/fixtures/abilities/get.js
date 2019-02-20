const stateResponse = data => ({
  data
});

const states = {};

const ability_1 = {
  event: true,
  action: false,
  state: false,
  _id: "ability-id-1",
  name: "only-event",
  description: "Only event ability",
  eventDescription: "The event has been triggered",
  _user: "user-id-2",
  _service: "module-id-1",
  createdAt: "2018-12-09T10:53:45.595Z",
  updatedAt: "2018-12-09T10:53:45.595Z"
};

const ability_5 = {
  event: false,
  action: true,
  state: false,
  _id: "ability-id-5",
  name: "bool-action",
  description: "Only Action",
  type: "boolean",
  actionDescription: "Switches on/off the relay",
  _user: "user-id-2",
  _service: "module-id-1",
  createdAt: "2018-12-31T09:06:32.929Z",
  updatedAt: "2018-12-31T09:06:32.929Z"
};

const ability_6 = {
  event: false,
  action: false,
  state: true,
  _id: "ability-id-6",
  name: "only-state",
  description: "Only State",
  type: "boolean",
  stateDescription: "Current relay status",
  _user: "user-id-2",
  _service: "module-id-1",
  createdAt: "2018-12-31T09:06:32.929Z",
  updatedAt: "2018-12-31T09:06:32.929Z"
};

states["ability-id-6"] = stateResponse(false);

const ability_2 = {
  event: true,
  action: true,
  state: false,
  _id: "ability-id-2",
  name: "event-action",
  description: "Event and action ability",
  actionDescription: "Trigger the webhook",
  eventDescription: "The webhook has been triggered",
  _user: "user-id-2",
  _service: "module-id-1",
  createdAt: "2018-12-09T10:53:45.595Z",
  updatedAt: "2018-12-09T10:53:45.595Z"
};

// DATA TYPES, only tested on abilities with state and action.
const ability_4 = {
  event: false,
  action: true,
  state: true,
  _id: "ability-id-4",
  name: "boolean",
  description: "Boolean",
  type: "boolean",
  actionDescription: "Switches on/off the relay",
  stateDescription: "Current relay status",
  _user: "user-id-3",
  _service: "module-id-2",
  createdAt: "2018-12-31T09:06:32.929Z",
  updatedAt: "2018-12-31T09:06:32.929Z"
};

states["ability-id-4"] = stateResponse(true);

const ability_8 = {
  ...ability_4,
  _id: "ability-id-8",
  name: "string",
  description: "String",
  type: "string"
};

states["ability-id-8"] = stateResponse("foo string");

const ability_9 = {
  ...ability_4,
  _id: "ability-id-9",
  name: "str-Enum",
  description: "String with enum",
  type: "string",
  enum: ["Foo1", "Foo 2", "Foo3", "Foo 4 large string"]
};

states["ability-id-9"] = stateResponse("Foo 2");

const ability_10 = {
  ...ability_4,
  _id: "ability-id-10",
  name: "str-DateTime",
  description: "String with date-time format",
  type: "string",
  format: "date-time"
};

states["ability-id-10"] = stateResponse("2018-11-13T20:20:39+00:00");

const ability_11 = {
  ...ability_4,
  _id: "ability-id-11",
  name: "str-Email",
  description: "String with email format",
  type: "string",
  format: "email"
};

states["ability-id-11"] = stateResponse("foo@foo.com");

const ability_12 = {
  ...ability_4,
  _id: "ability-id-12",
  name: "str-HostName",
  description: "String with hostName format",
  type: "string",
  format: "hostname"
};

states["ability-id-12"] = stateResponse("foo.com");

const ability_13 = {
  ...ability_4,
  _id: "ability-id-13",
  name: "str-IPv4",
  description: "String with ipv4 format",
  type: "string",
  format: "ipv4"
};

states["ability-id-13"] = stateResponse("192.168.1.120");

const ability_14 = {
  ...ability_4,
  _id: "ability-id-14",
  name: "str-IPv6",
  description: "String with ipv6 format",
  type: "string",
  format: "ipv6"
};

states["ability-id-14"] = stateResponse("0:0:0:0:0:ffff:c0a8:178");

const ability_15 = {
  ...ability_4,
  _id: "ability-id-15",
  name: "str-URI",
  description: "String with uri format",
  type: "string",
  format: "uri"
};

states["ability-id-15"] = stateResponse("http://192.168.1.120:3400/foo");

const ability_16 = {
  ...ability_4,
  _id: "ability-id-16",
  name: "str-Length",
  description: "String with max and min length",
  type: "string",
  maxLength: 10,
  minLength: 5
};

states["ability-id-16"] = stateResponse("Here goes");

const ability_17 = {
  ...ability_4,
  _id: "ability-id-17",
  name: "str-pattern",
  description: "String with pattern",
  type: "string",
  pattern: "^Foo.*$"
};

states["ability-id-17"] = stateResponse("Foo string");

const ability_18 = {
  ...ability_4,
  _id: "ability-id-18",
  name: "number",
  description: "Number",
  type: "number"
};

states["ability-id-18"] = stateResponse(34);

const ability_19 = {
  ...ability_4,
  _id: "ability-id-19",
  name: "number-multiple",
  description: "Number multipleOf",
  type: "number",
  multipleOf: 10
};

states["ability-id-19"] = stateResponse(40);

const ability_20 = {
  ...ability_4,
  _id: "ability-id-20",
  name: "number-min",
  description: "Number minimum",
  type: "number",
  minimum: 5
};

states["ability-id-20"] = stateResponse(6);

const ability_21 = {
  ...ability_4,
  _id: "ability-id-21",
  name: "number-min-excl",
  description: "Number minimum exclusive",
  type: "number",
  minimum: 5,
  exclusiveMinimum: true
};

states["ability-id-21"] = stateResponse(14123.23);

const ability_22 = {
  ...ability_4,
  _id: "ability-id-22",
  name: "number-max",
  description: "Number maximum",
  type: "number",
  maximum: 20
};

states["ability-id-22"] = stateResponse(17);

const ability_23 = {
  ...ability_4,
  _id: "ability-id-23",
  name: "number-max-excl",
  description: "Number maximum exclusive",
  type: "number",
  maximum: 20,
  exclusiveMaximum: true
};

states["ability-id-23"] = stateResponse(19.8);

const ability_24 = {
  ...ability_4,
  _id: "ability-id-24",
  name: "number-min-max",
  description: "Number with maximum and minimum",
  type: "number",
  minimum: 5,
  maximum: 30
};

states["ability-id-24"] = stateResponse(12);

const ability_25 = {
  ...ability_4,
  _id: "ability-id-25",
  name: "number-enum",
  description: "Number with enum",
  type: "number",
  enum: [10, 20, 30, 40]
};

states["ability-id-25"] = stateResponse(20);

const ability_7 = {
  event: true,
  action: false,
  state: true,
  _id: "ability-id-7",
  name: "event-state",
  description: "Event and state",
  type: "boolean",
  eventDescription: "Switches on/off the relay",
  stateDescription: "Current relay status",
  _user: "user-id-3",
  _service: "module-id-2",
  createdAt: "2018-12-31T09:06:32.929Z",
  updatedAt: "2018-12-31T09:06:32.929Z"
};

states["ability-id-7"] = stateResponse(true);

const ability_3 = {
  event: true,
  action: true,
  state: true,
  _id: "ability-id-3",
  name: "event-action-state",
  description: "Event action and state",
  type: "boolean",
  actionDescription: "Switches on/off the relay",
  stateDescription: "Current relay status",
  eventDescription: "The relay status has changed",
  _user: "user-id-3",
  _service: "module-id-2",
  createdAt: "2018-12-31T09:06:32.929Z",
  updatedAt: "2018-12-31T09:06:32.929Z"
};

states["ability-id-3"] = stateResponse(false);

const getAbilitiesSuccess = {
  url: "/api/abilities",
  method: "GET",
  response: {
    status: 200,
    body: [
      ability_1,
      ability_2,
      ability_3,
      ability_4,
      ability_5,
      ability_6,
      ability_7,
      ability_8,
      ability_9,
      ability_10,
      ability_11,
      ability_12,
      ability_13,
      ability_14,
      ability_15,
      ability_16,
      ability_17,
      ability_18,
      ability_19,
      ability_20,
      ability_21,
      ability_22,
      ability_23,
      ability_24,
      ability_25
    ]
  }
};

const getAbility2Success = {
  url: "/api/abilities/ability-id-2",
  method: "GET",
  response: {
    status: 200,
    body: ability_2
  }
};

const getAbilitySuccess = {
  url: "/api/abilities/:id",
  method: "GET",
  response: {
    status: 200,
    body: ability_1
  }
};

const getAbilityState = {
  url: "/api/abilities/:id/sstate",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(states[req.params.id]);
  }
};

module.exports = {
  getAbilitiesSuccess,
  getAbilitySuccess,
  getAbility2Success,
  getAbilityState
};
