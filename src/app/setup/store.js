import { combineReducers, createStore } from "redux";

import { Module as HomeMenuModule } from "src/modules/menu-home";

export const setupStore = () => {
  return createStore(
    combineReducers({
      [HomeMenuModule.redux.NAMESPACE]: HomeMenuModule.redux.reducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
