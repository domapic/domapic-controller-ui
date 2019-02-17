import { plugins } from "reactive-data-source";

import { Component as AbilityCardComponent } from "../components/ability-card";

import { abilityStates } from "src/data-layer/services";

export const mapDataSourceToProps = ({ ability }) => {
  const readAbilityState = ability.state && abilityStates.byId(ability._id).read;
  return {
    state: readAbilityState ? readAbilityState.getters.value : null,
    stateError: readAbilityState ? readAbilityState.getters.error : null,
    stateLoading: readAbilityState ? readAbilityState.getters.loading : false
  };
};

export const AbilityCard = plugins.connect(mapDataSourceToProps)(AbilityCardComponent);
