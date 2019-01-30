import { origins } from "reactive-data-source";

// AUTHENTICATION SESSION

export const authSession = new origins.LocalStorage("authentication");

authSession.addCustomFilter({
  refreshToken: () => "refreshToken"
});

authSession.addCustomFilter({
  userId: () => "userId"
});

// AUTHENTICATION API

export const authJwt = new origins.Api("/auth/jwt", {
  create: true,
  read: false
});
