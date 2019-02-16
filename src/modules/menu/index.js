import { Menu } from "./Layouts";

import { store } from "./state/state";
import { setup } from "./setup";

Menu.store = store;
Menu.setup = setup;

export const Module = Menu;
