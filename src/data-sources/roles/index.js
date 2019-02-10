import { origins, Selector } from "reactive-data-source";

const ROLES = [
  {
    name: "admin",
    isSystem: false
  },
  {
    name: "operator",
    isSystem: false
  },
  {
    name: "module",
    isSystem: true
  },
  {
    name: "plugin",
    isSystem: true
  },
  {
    name: "service-registerer",
    isSystem: true
  }
];

export const roles = new origins.MemoryStorage("roles", {
  defaultValue: ROLES
});

export const nonSystemRoles = new Selector(
  roles,
  rolesResults => rolesResults.filter(role => !role.isSystem),
  []
);
