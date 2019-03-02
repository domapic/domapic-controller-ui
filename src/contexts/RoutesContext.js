import React from "react";

const defaultRoute = "/";

export const defaultRoutes = {
  assets: defaultRoute,
  home: defaultRoute,
  configuration: defaultRoute,
  users: defaultRoute,
  account: defaultRoute,
  about: defaultRoute,
  modules: defaultRoute,
  plugins: defaultRoute
};

export const RoutesContext = React.createContext(defaultRoutes);
