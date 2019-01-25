import { Module as Dashboard } from "src/modules/dashboard";
import { Module as Modules } from "src/modules/modules";
import { Component as Login } from "src/components/login";

import { config } from "./config";

export const sections = {
  dashboard: {
    name: "Dashboard",
    route: "/dashboard",
    component: Dashboard
  },
  modules: {
    name: "Modules",
    route: "/modules",
    component: Modules
  }
};

export const routes = {
  index: {
    route: config.baseRoute,
    redirectTo: sections.dashboard.route
  },
  login: {
    route: "/login",
    component: Login
  }
};

export const sectionsAsArray = Object.values(sections);

export const sectionsRoutes = sectionsAsArray.map(section => section.route);

export const sectionsRoutesMatcher = `(${sectionsRoutes.join("|")})`;
