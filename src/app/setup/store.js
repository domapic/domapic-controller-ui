import { combineReducers, createStore } from "redux";

import { Module as Menu } from "src/modules/menu";

export const setupStore = () => {
  return createStore(
    combineReducers({
      ...Menu.store
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
