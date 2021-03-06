import React from "react";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";

import { RoutesContext } from "src/contexts/RoutesContext";

import { environment } from "./config/environment";
import { routes, sections } from "./routes";
import { MainRouter } from "./routers/Main";

import { setupDataSources } from "./setup/dataSources";
import { setupStore } from "./setup/store";
import { setupModules } from "./setup/modules";

import "./app.css";

const routesContext = {
  assets: `${environment.staticsRoute}assets`,
  home: routes.index.route,
  configuration: sections.configuration.route,
  users: sections.users.route,
  account: sections.account.route,
  about: routes.about.route,
  swagger: routes.swagger.route,
  modules: sections.modules.route,
  plugins: sections.plugins.route
};

const history = createHistory({
  basename: routes.index.route
});

setupDataSources(history);
const store = setupStore(history);
setupModules(history, store, routes, sections);

export const App = () => (
  <RoutesContext.Provider value={routesContext}>
    <Provider store={store}>
      <MainRouter history={history} />
    </Provider>
  </RoutesContext.Provider>
);
