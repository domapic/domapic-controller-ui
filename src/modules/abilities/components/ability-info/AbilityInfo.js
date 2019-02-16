import React from "react";
import PropTypes from "prop-types";

import { Component as ItemInfo } from "src/components/item-info";

export const AbilityInfo = ({ loading, ability = {} }) => (
  <ItemInfo
    loading={loading}
    data={[
      {
        label: "Name",
        value: ability.name
      },
      {
        label: "Description",
        value: ability.description
      }
    ]}
  />
);

AbilityInfo.propTypes = {
  ability: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired
};
