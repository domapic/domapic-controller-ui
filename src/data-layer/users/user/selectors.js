import { Selector } from "reactive-data-source";

import { byIdFilter } from "../../helpers";

import { isSystemRole } from "../helpers";
import { roles } from "../roles/origins";

import { userAvatar } from "../avatar/selectors";
import { byEmailFilter } from "../avatar/filters";

import { userModels } from "./origins";

export const userModelsWithExtraData = new Selector(
  {
    source: userModels,
    filter: id => byIdFilter(id)
  },
  {
    source: userAvatar,
    filter: (filter, previousResults) => byEmailFilter(previousResults[0].email)
  },
  roles,
  (userResults, avatarResult, rolesResults) => {
    return {
      ...userResults,
      ...avatarResult,
      isSystemRole: isSystemRole(userResults, rolesResults),
      isAnonymous: userResults.role === "anonymous"
    };
  },
  {}
);

userModelsWithExtraData.addCustomFilter({
  byId: id => id
});

export const userAllowedRoles = new Selector(
  roles,
  {
    source: userModelsWithExtraData,
    filter: id => id
  },
  (rolesResults, userResults) => {
    if (userResults.isSystemRole) {
      return rolesResults.filter(role => role.name === userResults.role);
    }
    return rolesResults.filter(role => !role.isSystem);
  },
  []
);

userAllowedRoles.addCustomFilter({
  byId: id => id
});
