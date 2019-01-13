import { Dashboard } from "src/components/dashboard/Dashboard";
import { Modules } from "src/components/modules/Modules";

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

export const sectionsAsArray = Object.values(sections);
