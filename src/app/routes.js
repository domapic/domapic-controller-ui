import { Module as About } from "src/modules/about";
import { Module as Config } from "src/modules/config";
import { Module as Dashboard } from "src/modules/dashboard";
import { Module as Modules } from "src/modules/modules";
import { Module as Plugins } from "src/modules/plugins";
import { Module as Login } from "src/modules/login";
import { Module as Activity } from "src/modules/activity";
import { Module as Users } from "src/modules/users";
import { Module as Account } from "src/modules/account";
import { Module as Abilities } from "src/modules/abilities";

import { environment } from "./config/environment";

export const sections = {
  dashboard: {
    name: "Dashboard",
    route: "/dashboard",
    component: Dashboard,
    showInMenu: false
  },
  abilities: {
    name: "Abilities",
    route: "/abilities",
    component: Abilities,
    showInMenu: true
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
    component: Activity,
    showInMenu: true
  },
  configuration: {
    name: "Configuration",
    route: "/configuration",
    component: Config,
    showInMenu: false
  },
  users: {
    name: "Users",
    route: "/users",
    component: Users,
    showInMenu: false
  },
  account: {
    name: "Account",
    route: "/account",
    component: Account,
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
  about: {
    route: "/about",
    component: About
  },
  swagger: {
    route: "/swagger"
  }
};

export const sectionsAsArray = Object.values(sections);

export const menuSectionsAsArray = sectionsAsArray.filter(section => section.showInMenu);

export const sectionsRoutes = sectionsAsArray.map(section => section.route);

export const sectionsRoutesMatcher = `(${sectionsRoutes.join("|")})`;
