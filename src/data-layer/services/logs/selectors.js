import { Selector } from "reactive-data-source";

import { displayValue, formatDate } from "../../helpers";

import { abilitiesCollection } from "../abilities/origins";
import { servicesCollection } from "../services/origins";
import { logs } from "./origins";

export const logsPage = new Selector(
  {
    source: logs,
    filter: filter => {
      const query = {};
      if (filter) {
        if (filter.page) {
          query.page = filter.page;
        }
        if (filter.ability) {
          query.ability = filter.ability;
        }
        return {
          query
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
