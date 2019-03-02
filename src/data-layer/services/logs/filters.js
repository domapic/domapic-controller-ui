export const byPageAndAbility = filter => {
  const query = {};
  if (filter) {
    if (filter.page) {
      query.page = filter.page;
    }
    if (filter.ability) {
      query.ability = filter.ability;
    }
    return {
      query
    };
  }
  return null;
};
