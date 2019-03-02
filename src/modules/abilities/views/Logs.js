import { plugins } from "reactive-data-source";

import { Component as LogsList } from "src/components/logs-list";

import { logsPageWithDetails, logsPageWithDetailsLoaded } from "src/data-layer/services";

export const mapDataSourceToProps = ({ page, extraFilter }) => {
  if (!page) {
    return {
      logs: [],
      error: null,
      logsLoading: false,
      logsLoaded: true,
      logsError: false
    };
  }
  const filter = {
    page: page,
    ability: extraFilter.abilityId
  };
  const readLogs = logsPageWithDetails.filter(filter).read.getters;
  const readLogsLoaded = logsPageWithDetailsLoaded.filter(filter).read.getters;
  return {
    logs: readLogs.value,
    error: readLogs.error,
    logsLoading: readLogs.loading,
    logsLoaded: readLogsLoaded.value,
    logsError: readLogs.error
  };
};

export const Logs = plugins.connect(mapDataSourceToProps)(LogsList);
