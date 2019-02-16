import React from "react";
import PropTypes from "prop-types";

import { Grid } from "semantic-ui-react";
import { Component as Responsive } from "src/components/responsive";

import { Ability } from "./Ability";

export const Abilities = ({ abilities, baseUrl }) => {
  const content = (
    <React.Fragment>
      {abilities.map(ability => (
        <Grid.Column key={ability._id}>
          <Ability ability={ability} baseUrl={baseUrl} />
        </Grid.Column>
      ))}
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Responsive device="mobile-and-tablet">
        <Grid stackable columns={2}>
          {content}
        </Grid>
      </Responsive>
      <Responsive device="desktop">
        <Grid stackable columns={3}>
          {content}
        </Grid>
      </Responsive>
    </React.Fragment>
  );
};

Abilities.propTypes = {
  abilities: PropTypes.array,
  baseUrl: PropTypes.string
};
