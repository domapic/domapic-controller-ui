import { origins, Selector } from "reactive-data-source";

import { userAvatar, byEmailFilter } from "./avatar";

export const userMe = new origins.Api(
  "/users/me",
  {},
  {
    defaultValue: {}
  }
);

export const userMeWithAvatar = new Selector(
  userMe,
  {
    source: userAvatar,
    filter: (filter, results) => byEmailFilter(results[0].email || "")
  },
  (userMeData, userMeAvatarResponse) => ({
    ...userMeData,
    avatar: userMeAvatarResponse.status === 200 ? userMeAvatarResponse.request.responseURL : null
  }),
  {}
);

export const userMeIsAdmin = new Selector(
  userMe,
  userMeData => userMeData.role === "admin",
  false
);
