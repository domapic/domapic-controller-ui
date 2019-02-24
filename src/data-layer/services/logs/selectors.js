import { Selector } from "reactive-data-source";

import { abilitiesCollection } from "../abilities/origins";
import { servicesCollection } from "../services/origins";
import { logs } from "./origins";
import { addLogsDetails } from "./filters";

const NUMBER_OF_LOGS = 10;

export const lastLogs = new Selector(
  logs,
  logsResults => [...logsResults].reverse().slice(0, NUMBER_OF_LOGS),
  []
);

export const logsPage = new Selector(
  {
    source: logs,
    filter: filter => {
      if (filter) {
        return {
          query: {
            page: filter.page
          }
        };
      }
      return null;
    }
  },
  logsResults => logsResults,
  []
);

export const logsPageWithDetails = new Selector(
  abilitiesCollection,
  servicesCollection,
  {
    source: logsPage,
    filter: filter => filter
  },
  addLogsDetails,
  []
);

export const lastLogsDetails = new Selector(
  abilitiesCollection,
  servicesCollection,
  lastLogs,
  addLogsDetails,
  []
);

export const logsOfAbility = new Selector(
  lastLogsDetails,
  (lastLogsResults, abilityId) => lastLogsResults.filter(log => log._ability === abilityId),
  []
);
