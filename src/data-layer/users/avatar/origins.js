import { origins } from "reactive-data-source";

export const gravatar = new origins.Api(
  "https://www.gravatar.com/avatar/:hash",
  {},
  {
    fullResponse: true,
    validateStatus: () => true
  }
);
