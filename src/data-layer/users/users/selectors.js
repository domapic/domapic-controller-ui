import { sortBy } from "lodash";
import { Selector } from "reactive-data-source";

import { roles } from "../roles/origins";

import { isSystemRole } from "../helpers";
import { usersCollection } from "./origins";

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

export const usersCollectionExactFiltered = new Selector(
  usersCollection,
  (usersResults, { email, name }) => {
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
  },
  []
);

export const usersCollectionFiltered = new Selector(
  usersCollectionWithExtraData,
  (usersResults, { search, showSystem }) => {
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
  },
  []
);

export const usersCollectionFilteredAndSorted = new Selector(
  {
    source: usersCollectionFiltered,
    filter: ({ search, showSystem }) => ({ search, showSystem })
  },
  (usersResults, filter) => {
    const results = sortBy(usersResults, (filter && filter.sortBy) || "name");
    if (filter.reverse) {
      return results.reverse();
    }
    return results;
  },
  []
);
