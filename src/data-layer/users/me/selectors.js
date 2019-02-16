import { Selector } from "reactive-data-source";

import { isSystemRole } from "../helpers";
import { userAvatar } from "../avatar/selectors";
import { byEmailFilter } from "../avatar/filters";
import { roles } from "../roles/origins";

import { userMe } from "./origins";

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
