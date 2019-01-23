import React from "react";

import "./config/configDataSources";
import { MainRouter } from "./routers/Main";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

export const App = () => (
  <div className="app">
    <MainRouter />
  </div>
);
