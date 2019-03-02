import { origins } from "reactive-data-source";

import { baseConfig } from "../setup";

// AUTHENTICATION SESSION

export const authSession = new origins.LocalStorage("authentication");

authSession.addCustomFilter({
  refreshToken: () => "refreshToken"
});

authSession.addCustomFilter({
  apiKey: () => "apiKey"
});

// AUTHENTICATION API

export const authJwt = new origins.Api(
  "/auth/jwt",
  {
    create: true,
    read: false
  },
  baseConfig
);
