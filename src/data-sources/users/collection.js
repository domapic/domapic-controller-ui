import { origins, Selector } from "reactive-data-source";
import sortBy from "lodash.sortby";

import { userAvatar } from "./avatar";

const NON_SYSTEM_ROLES = ["admin", "operator"];

export const usersCollection = new origins.Api(
  "/users",
  {
    create: true,
    update: true,
    delete: true
  },
  {
    defaultValue: []
  }
);

export const usersCollectionWithExtraData = new Selector(
  usersCollection,
  usersResults => {
    return Promise.all(
      usersResults.map(user => {
        const isSystemRole = NON_SYSTEM_ROLES.indexOf(user.role) < 0;
        if (user.email) {
          return userAvatar
            .byEmail(user.email)
            .read()
            .then(avatarResponse => ({
              ...user,
              avatar: avatarResponse.status === 200 ? avatarResponse.request.responseURL : null,
              isSystemRole
            }));
        }
        return {
          ...user,
          avatar: null,
          isSystemRole
        };
      })
    );
  },
  []
);

const searchBy = (usersResults, { search, showSystem }) => {
  return usersResults.filter(user => {
    if (!showSystem && user.isSystemRole) {
      return false;
    }
    if (!search) {
      return true;
    }
    return (
      user.name.indexOf(search) > -1 ||
      (user.email && user.email.indexOf(search) > -1) ||
      user.role.indexOf(search) > -1
    );
  });
};

export const usersCollectionFiltered = new Selector(usersCollectionWithExtraData, searchBy, []);

const sortAndOrderBy = (usersResults, filter) => {
  const results = sortBy(usersResults, (filter && filter.sortBy) || "name");
  if (filter.reverse) {
    return results.reverse();
  }
  return results;
};

export const usersCollectionFilteredAndSorted = new Selector(
  {
    source: usersCollectionFiltered,
    filter: ({ search, showSystem }) => ({ search, showSystem })
  },
  sortAndOrderBy,
  []
);
