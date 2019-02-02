import { Module as Login } from "src/modules/login";
import { Module as HomeMenu } from "src/modules/menu-home";

export const setupModules = (history, store) => {
  Login.setup({
    type: Login.types.JWT,
    allowChangeType: true,
    header: "Domapic Controller"
  });

  HomeMenu.setup({
    history,
    store
  });
};
