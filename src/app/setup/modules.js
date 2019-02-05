import { Module as Login } from "src/modules/login";
import { Module as HomeMenu } from "src/modules/menu-home";
import { Module as Modules } from "src/modules/modules";

export const setupModules = (history, store, routes, sections) => {
  Login.setup({
    type: Login.types.JWT,
    allowChangeType: true,
    header: "Domapic Controller"
  });

  HomeMenu.setup({
    history,
    store
  });

  Modules.setup({
    abilitiesBaseUrl: sections.abilities.route
  });
};
