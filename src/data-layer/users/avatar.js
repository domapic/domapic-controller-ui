import md5 from "md5";
import { origins, Selector } from "reactive-data-source";

export const gravatar = new origins.Api(
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

export const userAvatar = new Selector(
  {
    source: gravatar,
    filter: filter => filter
  },
  gravatarResponse => ({
    avatar: gravatarResponse.status === 200 ? gravatarResponse.request.responseURL : null
  })
);

userAvatar.addCustomFilter({
  byEmail: byEmailFilter
});
