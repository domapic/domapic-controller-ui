import React from "react";

export const defaultElements = {
  useWindow: true,
  getScrollContainer: () => null
};

export const ScrollContext = React.createContext(defaultElements);
