import { plugins } from "reactive-data-source";

import { Component as AbilityComponent } from "../components/ability";

import { abilityModelsWithExtraData } from "src/data-layer/services";
import { countLogs } from "src/data-layer/services";

import { Logs } from "./Logs";

export const mapDataSourceToProps = ({ id }) => {
  const ability = abilityModelsWithExtraData.byId(id).read;
  const getLogsCount = countLogs.ofAbility(id).read.getters;
  return {
    LogsList: Logs,
    logsPageSize: 10,
    logsCount: getLogsCount.value,
    logsCountLoading: getLogsCount.loading,
    abilityId: id,
    ability: ability.getters.value,
    abilityError: ability.getters.error,
    abilityLoading: ability.getters.loading
  };
};

export const Ability = plugins.connect(mapDataSourceToProps)(AbilityComponent);
