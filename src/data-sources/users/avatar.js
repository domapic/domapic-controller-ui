import md5 from "md5";
import { origins } from "reactive-data-source";

export const userAvatar = new origins.Api(
  "https://www.gravatar.com/avatar/:hash",
  {},
  {
    fullResponse: true,
    validateStatus: () => true
  }
);

export const byEmailFilter = (email = "") => ({
  params: {
    hash: md5(email.toLowerCase())
  },
  query: {
    d: 404
  }
});

userAvatar.addCustomFilter({
  byEmail: byEmailFilter
});
