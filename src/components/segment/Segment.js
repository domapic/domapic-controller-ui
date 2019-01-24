import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Segment as SegmentSemantic, Loader, Header } from "semantic-ui-react";

export const Segment = ({ children, loading, header }) => {
  const segmentHeader = header ? <Header as="h2">{header}</Header> : null;
  return (
    <React.Fragment>
      {segmentHeader}
      <SegmentSemantic>
        <Dimmer active={loading} inverted>
          <Loader inverted />
        </Dimmer>
        {children}
      </SegmentSemantic>
    </React.Fragment>
  );
};

Segment.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  loading: PropTypes.bool
};
