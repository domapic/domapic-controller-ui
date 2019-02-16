import { plugins } from "reactive-data-source";

import { Component as AbilityComponent } from "../components/ability";

import { abilityModels } from "src/data-layer/services";
import { logsOfAbility } from "src/data-layer/services";

export const mapDataSourceToProps = ({ id }) => {
  const ability = abilityModels.byId(id).read;
  const logs = logsOfAbility.filter(id).read;
  return {
    logs: logs.getters.value,
    logsError: logs.getters.error,
    logsLoading: logs.getters.loading,
    ability: ability.getters.value,
    abilityError: ability.getters.error,
    abilityLoading: ability.getters.loading
  };
};

export const Ability = plugins.connect(mapDataSourceToProps)(AbilityComponent);
