import { plugins } from "reactive-data-source";

import { Component as LogsList } from "src/components/logs-list";

import { logsPageWithDetails } from "src/data-layer/services";

export const mapDataSourceToProps = ({ page, extraFilter }) => {
  if (!page) {
    return {
      logs: [],
      error: null,
      logsLoading: false
    };
  }
  const readLogs = logsPageWithDetails.filter({
    page: page,
    ability: extraFilter.abilityId
  }).read.getters;
  return {
    logs: readLogs.value,
    error: readLogs.error,
    logsLoading: readLogs.loading
  };
};

export const Logs = plugins.connect(mapDataSourceToProps)(LogsList);
