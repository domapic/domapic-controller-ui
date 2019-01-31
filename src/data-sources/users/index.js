import { origins } from "reactive-data-source";

export const userMe = new origins.Api(
  "/users/me",
  {},
  {
    defaultValue: {}
  }
);
