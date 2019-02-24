import { displayValue, formatDate } from "../../helpers";

export const addLogsDetails = (abilitiesResults, servicesResults, logsResults) => {
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
};
