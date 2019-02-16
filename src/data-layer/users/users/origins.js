import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

export const usersCollection = new origins.Api(
  "/users",
  {
    create: true
  },
  {
    ...authConfig,
    defaultValue: []
  }
);
