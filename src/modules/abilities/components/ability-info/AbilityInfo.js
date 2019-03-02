import React from "react";
import PropTypes from "prop-types";

import { Component as ItemInfo } from "src/components/item-info";

const booleanToYesNo = bool => (bool ? "Yes" : "No");

export const AbilityInfo = ({ loading, ability = {} }) => (
  <ItemInfo
    loading={loading}
    data={[
      {
        label: "Module Name",
        value: ability.serviceName
      },
      {
        label: "Ability name",
        value: ability.name
      },
      {
        label: "Description",
        value: ability.description
      },
      {
        label: "Data type",
        value: ability.type || "-"
      },
      {
        label: "Emits event",
        value: booleanToYesNo(ability.event)
      },
      {
        label: "Event description",
        value: ability.event ? ability.eventDescription : "-"
      },
      {
        label: "Can dispatch action",
        value: booleanToYesNo(ability.action)
      },
      {
        label: "Action description",
        value: ability.action ? ability.actionDescription : "-"
      },
      {
        label: "Has state",
        value: booleanToYesNo(ability.state)
      },
      {
        label: "State description",
        value: ability.state ? ability.stateDescription : "-"
      }
    ]}
  />
);

AbilityInfo.propTypes = {
  ability: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired
};
