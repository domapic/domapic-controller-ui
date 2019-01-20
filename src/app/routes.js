import { Main as Dashboard } from "src/modules/dashboard/Main";
import { Main as Modules } from "src/modules/modules/Main";
import { NotFound } from "src/components/not-found/NotFound";
// import { Login } from "src/modules/login/Login";

import { config } from "../config";

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
    route: "/login" /*,
    component: Login */
  },
  notFound: {
    component: NotFound
  }
};

export const sectionsAsArray = Object.values(sections);

export const sectionsRoutes = sectionsAsArray.map(section => section.route);

export const sectionsRoutesMatcher = `(${sectionsRoutes.join("|")})`;
