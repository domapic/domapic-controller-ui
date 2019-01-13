import { Dashboard } from "src/components/dashboard/Dashboard";
import { ConnectedModules } from "src/components/modules/Modules";

export const sections = {
  dashboard: {
    name: "Dashboard",
    route: "/dashboard",
    component: Dashboard
  },
  modules: {
    name: "Modules",
    route: "/modules",
    component: ConnectedModules
  }
};

export const sectionsAsArray = Object.values(sections);
