import React from "react";

import { ConfigContext } from "src/context/ConfigContext";

import { config } from "./config";
import "./config/configDataSources";
import { MainRouter } from "./routers/Main";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

export const App = () => (
  <div className="app">
    <ConfigContext.Provider value={{ staticsRoute: config.staticsRoute }}>
      <MainRouter />
    </ConfigContext.Provider>
  </div>
);
