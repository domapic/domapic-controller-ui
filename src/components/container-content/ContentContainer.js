import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Segment, Loader, Header } from "semantic-ui-react";

export const ContentContainer = ({ children, loading, header }) => {
  const segmentHeader = header ? <Header as="h2">{header}</Header> : null;
  return (
    <React.Fragment>
      {segmentHeader}
      <Segment>
        <Dimmer active={loading} inverted>
          <Loader inverted />
        </Dimmer>
        {children}
      </Segment>
    </React.Fragment>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  loading: PropTypes.bool
};
