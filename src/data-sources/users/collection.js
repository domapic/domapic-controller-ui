import { origins, Selector } from "reactive-data-source";
import sortBy from "lodash.sortby";

const NON_SYSTEM_ROLES = ["admin", "operator"];

export const usersCollection = new origins.Api(
  "/users",
  {
    create: true,
    update: true,
    delete: true
  },
  {
    defaultValue: {}
  }
);

const searchBy = (usersResults, { search, showSystem }) => {
  return usersResults.filter(user => {
    if (!showSystem && NON_SYSTEM_ROLES.indexOf(user.role) < 0) {
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

export const usersCollectionFiltered = new Selector(usersCollection, searchBy, []);

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
