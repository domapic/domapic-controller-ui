import { usersCollectionExactFiltered } from "src/data-sources/users";

export const isUserNameRepeated = name => {
  console.log("VALIDATING!!");
  return usersCollectionExactFiltered
    .filter({
      name
    })
    .read()
    .then(results => {
      console.log("RESULTS");
      console.log(results);
      return results.length > 0;
    });
};

export const isUserEmailRepeated = email =>
  usersCollectionExactFiltered
    .filter({
      email
    })
    .read()
    .then(results => results.length > 0);
