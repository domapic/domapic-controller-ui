import { Selector } from "reactive-data-source";

import { roles } from "./origins";

export const nonSystemRoles = new Selector(
  roles,
  rolesResults => rolesResults.filter(role => !role.isSystem),
  []
);
