import { origins } from "reactive-data-source";

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

export const roles = new origins.MemoryStorage("roles", ROLES);
