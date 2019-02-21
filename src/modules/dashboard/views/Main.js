import { plugins } from "reactive-data-source";

import { Module as AbilityCard } from "src/modules/ability-card";
import { lastLogsDetails } from "src/data-layer/services";

import { Component as DashboardLayout } from "../components/dashboard-layout";

import { dashboardAbilities } from "../data-layer/selectors";

let config;

export const init = configuration => {
  config = configuration;
};

export const mapDataSourceToProps = () => {
  const abilities = dashboardAbilities.read;
  return {
    abilities: abilities.getters.value,
    abilitiesError: abilities.getters.error,
    abilitiesLoading: abilities.getters.loading,
    logs: lastLogsDetails.read.getters.value,
    logsError: lastLogsDetails.read.getters.error,
    logsLoading: lastLogsDetails.read.getters.loading,
    AbilityCard,
    abilitiesBaseUrl: config.abilitiesBaseUrl
  };
};

export const Main = plugins.connect(mapDataSourceToProps)(DashboardLayout);
