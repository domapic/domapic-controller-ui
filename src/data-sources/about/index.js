import { origins } from "reactive-data-source";

export const about = new origins.Api(
  "/about",
  {},
  {
    defaultValue: {}
  }
);
