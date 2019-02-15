import { origins, Selector } from "reactive-data-source";

import { authConfig } from "../setup";

import { display } from "../helpers";

const BASE_KEYS = {
  logLevel: "Log Level",
  port: "Port",
  authDisabled: "Authentication disabled range",
  color: "Colored logs",
  hostName: "Host Name",
  sslCert: "SSL certificate path",
  sslKey: "SSL key path",
  rejectUntrusted: "Reject untrusted certificates",
  auth: "Authentication enabled"
};

export const config = new origins.Api(
  "/config",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);

export const baseConfig = new Selector(
  config,
  configuration => {
    const base = [];
    Object.keys(configuration).forEach(key => {
      if (BASE_KEYS[key]) {
        base.push({
          key: key,
          label: BASE_KEYS[key],
          value: display(configuration[key]),
          originalValue: configuration[key]
        });
      }
    });
    return base;
  },
  []
);

export const customConfig = new Selector(
  config,
  configuration => {
    const custom = [];
    Object.keys(configuration).forEach(key => {
      if (!BASE_KEYS[key]) {
        custom.push({
          key: key,
          label: key,
          value: display(configuration[key]),
          originalValue: configuration[key]
        });
      }
    });
    return custom;
  },
  []
);
