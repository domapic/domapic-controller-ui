import { Module as Dashboard } from "src/modules/dashboard";
import { Module as Modules } from "src/modules/modules";
import { Module as Plugins } from "src/modules/plugins";
import { Module as Login } from "src/modules/login";

import { environment } from "./config/environment";

export const sections = {
  dashboard: {
    name: "Dashboard",
    route: "/dashboard",
    component: Dashboard,
    showInMenu: false
  },
  modules: {
    name: "Modules",
    route: "/modules",
    component: Modules,
    showInMenu: true
  },
  plugins: {
    name: "Plugins",
    route: "/plugins",
    component: Plugins,
    showInMenu: true
  },
  activity: {
    name: "Activity",
    route: "/activity",
    component: Modules,
    showInMenu: true
  },
  configuration: {
    name: "Configuration",
    route: "/configuration",
    component: Modules,
    showInMenu: false
  },
  users: {
    name: "Users",
    route: "/users",
    component: Modules,
    showInMenu: false
  },
  account: {
    name: "Account",
    route: "/account",
    component: Modules,
    showInMenu: false
  }
};

export const routes = {
  index: {
    route: environment.baseRoute,
    redirectTo: sections.dashboard.route
  },
  login: {
    route: "/login",
    component: Login
  },
  packageInfo: {
    route: "/package-info",
    component: Modules
  },
  swagger: {
    route: "/swagger"
  }
};

export const sectionsAsArray = Object.values(sections);

export const menuSectionsAsArray = sectionsAsArray.filter(section => section.showInMenu);

export const sectionsRoutes = sectionsAsArray.map(section => section.route);

export const sectionsRoutesMatcher = `(${sectionsRoutes.join("|")})`;
