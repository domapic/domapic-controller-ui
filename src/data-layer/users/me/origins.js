import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

export const userMe = new origins.Api(
  "/users/me",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);
