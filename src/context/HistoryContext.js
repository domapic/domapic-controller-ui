import React from "react";
import createHistory from "history/createMemoryHistory";

export const defaultHistory = {
  history: createHistory(),
  position: 0
};

export const HistoryContext = React.createContext(defaultHistory);
