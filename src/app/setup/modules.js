import { Module as Login } from "src/modules/login";
import { Module as Menu } from "src/modules/menu";
import { Module as Modules } from "src/modules/modules";
import { Module as Dashboard } from "src/modules/dashboard";

export const setupModules = (history, store, routes, sections) => {
  Login.setup({
    type: Login.constants.types.JWT,
    allowChangeType: true,
    header: "Domapic Controller"
  });

  Menu.setup({
    history,
    store
  });

  Modules.setup({
    abilitiesBaseUrl: sections.abilities.route
  });

  Dashboard.setup({
    abilitiesBaseUrl: sections.abilities.route
  });
};
