import { usersCollectionExactFiltered } from "./collection";

const NAME_REGEX = /^[a-z0-9_.-]*$/;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export const isValidUserName = name => name.length > 4 && NAME_REGEX.test(name);

export const isValidUserEmail = email => EMAIL_REGEX.test(email);

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
