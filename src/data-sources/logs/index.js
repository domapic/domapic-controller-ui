import { origins, Selector } from "reactive-data-source";

import { display, formatDate } from "../helpers";
import { abilitiesCollection } from "../abilities";
import { servicesCollection } from "../services";

const NUMBER_OF_LOGS = 100;

export const logs = new origins.Api(
  "/logs",
  {},
  {
    defaultValue: []
  }
);

export const lastLogs = new Selector(
  logs,
  logsResults => [...logsResults].reverse().slice(0, NUMBER_OF_LOGS),
  []
);

export const lastLogsDetails = new Selector(
  abilitiesCollection,
  servicesCollection,
  lastLogs,
  (abilitiesResults, servicesResults, logsResults) => {
    return logsResults.map(log => {
      const ability = abilitiesResults.find(ability => ability._id === log._ability);
      const service = servicesResults.find(service => service._id === ability._service);
      return {
        ...log,
        dateTime: formatDate(log.createdAt),
        module: (service && service.name) || "-",
        ability: (ability && ability.name) || "-",
        data: display(log.data)
      };
    });
  },
  []
);
