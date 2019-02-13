import { origins, Selector } from "reactive-data-source";

import { roles } from "../roles";

import { userAvatar, byEmailFilter } from "./avatar";
import { isSystemRole } from "./helpers";

export const userMe = new origins.Api(
  "/users/me",
  {},
  {
    defaultValue: {}
  }
);

export const userMeWithExtraData = new Selector(
  userMe,
  {
    source: userAvatar,
    filter: (filter, results) => byEmailFilter(results[0].email)
  },
  roles,
  (userMeData, userAvatarResult, rolesResults) => ({
    ...userMeData,
    ...userAvatarResult,
    isSystemRole: isSystemRole(userMeData, rolesResults)
  }),
  {}
);

export const userMeIsAdmin = new Selector(
  userMe,
  userMeData => userMeData.role === "admin",
  false
);
