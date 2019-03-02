import React from "react";

import { Label, Icon } from "semantic-ui-react";

export const AbilityActionError = () => (
  <Label color="red" ribbon="right" floating className="ability-action__label">
    <Icon name="warning sign" /> Error
  </Label>
);
