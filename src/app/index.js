import React from "react";

import { RoutesContext } from "src/context/RoutesContext";

import { config } from "./config";
import { routes } from "./routes";
import { MainRouter } from "./routers/Main";

import "./config/configDataSources";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

const routesContext = {
  assets: `${config.staticsRoute}assets`,
  home: routes.index.route
};

export const App = () => (
  <div className="app">
    <RoutesContext.Provider value={routesContext}>
      <MainRouter />
    </RoutesContext.Provider>
  </div>
);
