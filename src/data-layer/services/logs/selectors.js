import { Selector } from "reactive-data-source";

import { displayValue, formatDate } from "../../helpers";

import { abilitiesCollection } from "../abilities/origins";
import { servicesCollection } from "../services/origins";
import { byPageAndAbility } from "./filters";
import { logs } from "./origins";

export const logsPage = new Selector(
  {
    source: logs,
    filter: byPageAndAbility
  },
  logsResults => logsResults,
  []
);

export const logsPageLoaded = new Selector(
  {
    source: logs,
    filter: byPageAndAbility
  },
  () => true,
  false
);

export const logsPageWithDetails = new Selector(
  abilitiesCollection,
  servicesCollection,
  {
    source: logsPage,
    filter: filter => filter
  },
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

export const logsPageWithDetailsLoaded = new Selector(
  {
    source: logsPageWithDetails,
    filter: filter => filter
  },
  () => {
    return true;
  },
  false
);
