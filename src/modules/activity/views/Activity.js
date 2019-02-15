import { plugins } from "reactive-data-source";

import { Component as ActivityComponent } from "src/components/activity";

import { lastLogsDetails } from "src/data-layer/logs";

export const mapDataSourceToProps = () => {
  return {
    logs: lastLogsDetails.read.getters.value,
    error: lastLogsDetails.read.getters.error,
    loading: lastLogsDetails.read.getters.loading
  };
};

export const Activity = plugins.connect(mapDataSourceToProps)(ActivityComponent);
