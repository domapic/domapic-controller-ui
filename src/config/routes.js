import { multiRoutesMatcher, sectionsRoutes as getSectionRoutes } from "src/helpers/routes";

import { sections, sectionsAsArray } from "./sections";

export const routes = {
  index: "/",
  login: "/login"
};

export const index = routes.index;

export const defaultSection = sections.dashboard.route;

export const sectionsRoutes = getSectionRoutes(sectionsAsArray);

export const sectionsRoutesMatcher = multiRoutesMatcher(sectionsRoutes);
