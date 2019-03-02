import { plugins } from "reactive-data-source";

import { Component as ActivityComponent } from "../components/activity";
import { Logs } from "./Logs";

import { countLogs } from "src/data-layer/services";

export const mapDataSourceToProps = () => {
  const getLogsCount = countLogs.read.getters;
  return {
    LogsList: Logs,
    pageSize: 10,
    logsCount: getLogsCount.value,
    logsCountLoading: getLogsCount.loading,
    logsCountError: getLogsCount.error
  };
};

export const Activity = plugins.connect(mapDataSourceToProps)(ActivityComponent);
