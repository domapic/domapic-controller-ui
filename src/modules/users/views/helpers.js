import { usersCollectionExactFiltered } from "src/data-sources/users";

export const isUserNameRepeated = name =>
  usersCollectionExactFiltered
    .filter({
      name
    })
    .read()
    .then(results => results.length > 0);

export const isUserEmailRepeated = email =>
  usersCollectionExactFiltered
    .filter({
      email
    })
    .read()
    .then(results => results.length > 0);
