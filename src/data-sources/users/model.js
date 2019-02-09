import { origins, Selector } from "reactive-data-source";

import { roles } from "../roles";

import { byIdFilter } from "../helpers";
import { isSystemRole, avatarValueFromResponse } from "./helpers";
import { userAvatar, byEmailFilter } from "./avatar";

export const usersModel = new origins.Api(
  "/users/:id",
  {
    update: true,
    delete: true
  },
  {
    defaultValue: {}
  }
);

usersModel.addCustomFilter({
  byId: byIdFilter
});

export const usersModelWithExtraData = new Selector(
  {
    source: usersModel,
    filter: id => byIdFilter(id)
  },
  {
    source: userAvatar,
    filter: (filter, previousResults) => byEmailFilter(previousResults[0].email)
  },
  roles,
  (userResults, avatarResponse, rolesResults) => {
    return {
      ...userResults,
      isSystemRole: isSystemRole(userResults, rolesResults),
      avatar: avatarValueFromResponse(avatarResponse)
    };
  },
  {}
);

usersModelWithExtraData.addCustomFilter({
  byId: id => id
});

export const userAllowedRoles = new Selector(
  roles,
  {
    source: usersModelWithExtraData,
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
