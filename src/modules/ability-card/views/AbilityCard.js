import { plugins } from "reactive-data-source";

import { Component as AbilityCardComponent } from "../components/ability-card";

import {
  abilityStates,
  abilityStatesLoaded,
  abilityActions,
  validateAbilityData
} from "src/data-layer/services";

export const mapDataSourceToProps = ({ ability, history, baseUrl }) => {
  const readAbilityState = ability.state && abilityStates.byId(ability._id).read;
  const readAbilityStateLoaded = readAbilityState && abilityStatesLoaded.byId(ability._id).read;
  const abilityAction = abilityActions.byId(ability._id).create;

  const onClick = () => {
    history.push(`${baseUrl}/${ability._id}`);
  };

  const sendAbilityAction = data => {
    if (ability.type === "number") {
      data = Number(data);
    }
    return abilityAction.dispatch({ data });
  };

  return {
    state: readAbilityState ? readAbilityState.getters.value : null,
    stateError: readAbilityState ? readAbilityState.getters.error : null,
    stateLoading: readAbilityState ? readAbilityState.getters.loading : false,
    stateLoaded: readAbilityStateLoaded ? readAbilityStateLoaded.getters.value : false,
    validateAbilityData,
    sendAbilityAction,
    actionError: abilityAction.getters.error,
    actionLoading: abilityAction.getters.loading,
    onClick
  };
};

export const AbilityCard = plugins.connect(mapDataSourceToProps)(AbilityCardComponent);
