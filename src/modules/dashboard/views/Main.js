import { plugins } from "reactive-data-source";

import { Module as AbilityCard } from "src/modules/ability-card";
import { logsPageWithDetails, logsPageWithDetailsLoaded } from "src/data-layer/services";

import { Component as DashboardLayout } from "../components/dashboard-layout";

import { dashboardAbilities } from "../data-layer/selectors";

let config;

export const init = configuration => {
  config = configuration;
};

export const mapDataSourceToProps = () => {
  const abilities = dashboardAbilities.read;
  const filter = {
    page: 1
  };
  const readlogsPage = logsPageWithDetails.filter(filter).read.getters;
  const readLogsLoaded = logsPageWithDetailsLoaded.filter(filter).read.getters;
  return {
    abilities: abilities.getters.value,
    abilitiesError: abilities.getters.error,
    abilitiesLoading: abilities.getters.loading,
    logs: readlogsPage.value,
    logsError: readlogsPage.error,
    logsLoading: readlogsPage.loading,
    logsLoaded: readLogsLoaded.value,
    AbilityCard,
    abilitiesBaseUrl: config.abilitiesBaseUrl
  };
};

export const Main = plugins.connect(mapDataSourceToProps)(DashboardLayout);
