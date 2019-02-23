import React from "react";
import PropTypes from "prop-types";

import { Grid, Segment } from "semantic-ui-react";
import { Component as Responsive } from "src/components/responsive";
import { Component as ErrorComponent } from "src/components/error";
import { Message } from "semantic-ui-react";

import "./abilities.css";

export const NoResults = () => {
  return <Message size="large">No abilities found</Message>;
};

export const Abilities = ({
  abilities,
  abilitiesLoading,
  abilitiesError,
  baseUrl,
  AbilityCard
}) => {
  if (abilitiesError) {
    return <ErrorComponent>{abilitiesError.message}</ErrorComponent>;
  }
  const content = (
    <React.Fragment>
      {abilities.map(ability => (
        <Grid.Column key={ability._id}>
          <AbilityCard ability={ability} baseUrl={baseUrl} />
        </Grid.Column>
      ))}
    </React.Fragment>
  );
  return (
    <Segment basic loading={abilitiesLoading} className="abilities__container">
      {abilities.length < 1 && !abilitiesLoading ? (
        <NoResults />
      ) : (
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
      )}
    </Segment>
  );
};

Abilities.propTypes = {
  AbilityCard: PropTypes.func,
  abilities: PropTypes.array,
  abilitiesError: PropTypes.instanceOf(Error),
  abilitiesLoading: PropTypes.bool,
  baseUrl: PropTypes.string
};
