import { origins, Selector } from "reactive-data-source";
import sortBy from "lodash.sortby";

import { roles } from "../roles";

import { isSystemRole } from "./helpers";

export const usersCollection = new origins.Api(
  "/users",
  {
    create: true
  },
  {
    defaultValue: []
  }
);

export const usersCollectionWithExtraData = new Selector(
  usersCollection,
  roles,
  (usersResults, rolesResults) => {
    return usersResults.map(user => ({
      ...user,
      isSystemRole: isSystemRole(user, rolesResults)
    }));
  },
  []
);

const exactSearchBy = (usersResults, { email, name }) => {
  return usersResults.filter(user => {
    let matchKeys = 0;
    let matches = 0;
    if (email) {
      matchKeys++;
      if (user.email === email) {
        matches++;
      }
    }
    if (name) {
      matchKeys++;
      if (user.name === name) {
        matches++;
      }
    }
    return matchKeys === matches;
  });
};

export const usersCollectionExactFiltered = new Selector(usersCollection, exactSearchBy, []);

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
