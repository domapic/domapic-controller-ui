import { Menu } from "./Layouts";

import { store } from "./state/state";
import { setup } from "./setup";

export const Module = Menu;

Module.store = store;
Module.setup = setup;
