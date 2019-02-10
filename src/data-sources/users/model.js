import { origins, Selector } from "reactive-data-source";

import { roles } from "../roles";

import { byIdFilter } from "../helpers";
import { isSystemRole, avatarValueFromResponse } from "./helpers";
import { userAvatar, byEmailFilter } from "./avatar";

const NAME_REGEX = /^[a-z0-9_.-]*$/;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export const isValidUserName = name => name.length > 4 && NAME_REGEX.test(name);

export const isValidUserEmail = email => EMAIL_REGEX.test(email);

export const usersModels = new origins.Api(
  "/users/:id",
  {
    update: true,
    delete: true
  },
  {
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
  (userResults, avatarResponse, rolesResults) => {
    return {
      ...userResults,
      isSystemRole: isSystemRole(userResults, rolesResults),
      avatar: avatarValueFromResponse(avatarResponse)
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
