import { Selector } from "reactive-data-source";

import { displayValue, formatDate } from "../../helpers";

import { abilitiesCollection } from "../abilities/origins";
import { servicesCollection } from "../services/origins";
import { logs } from "./origins";

const NUMBER_OF_LOGS = 100;

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
        data: displayValue(log.data)
      };
    });
  },
  []
);

export const logsOfAbility = new Selector(
  lastLogsDetails,
  (lastLogsResults, abilityId) => lastLogsResults.filter(log => log._ability === abilityId),
  []
);
