import sortBy from "lodash.sortby";

export const searchByNameAndDescription = (servicesResults, search) => {
  if (!search) {
    return servicesResults;
  }
  return servicesResults.filter(
    service => service.name.indexOf(search) > -1 || service.description.indexOf(search) > -1
  );
};

export const sortAndOrderBy = (servicesResults, filter) => {
  const results = sortBy(servicesResults, (filter && filter.sortBy) || "name");
  if (filter.reverse) {
    return results.reverse();
  }
  return results;
};
