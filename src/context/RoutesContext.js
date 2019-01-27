import React from "react";
import createHistory from "history/createMemoryHistory";

export const defaultRoutes = {
  assets: "/assets",
  home: "/",
  history: createHistory()
};

export const RoutesContext = React.createContext(defaultRoutes);
