import { origins, Selector } from "reactive-data-source";

import { authConfig } from "../setup";
import { roles } from "../roles";

import { byIdFilter } from "../helpers";
import { isSystemRole } from "./helpers";
import { userAvatar, byEmailFilter } from "./avatar";

export const usersModels = new origins.Api(
  "/users/:id",
  {
    update: true,
    delete: true
  },
  {
    ...authConfig,
    defaultValue: {}
  }
);

usersModels.addCustomFilter({
  byId: byIdFilter
});

export const usersModelsWithExtraData = new Selector(
  {
    source: usersModels,
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
      isSystemRole: isSystemRole(userResults, rolesResults)
    };
  },
  {}
);

usersModelsWithExtraData.addCustomFilter({
  byId: id => id
});

export const userAllowedRoles = new Selector(
  roles,
  {
    source: usersModelsWithExtraData,
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
