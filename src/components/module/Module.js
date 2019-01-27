import React from "react";
import PropTypes from "prop-types";
import { Placeholder } from "semantic-ui-react";

import { Component as ErrorComponent } from "src/components/error";
import { Component as ContentContainer } from "src/components/container-content";

const ModuleLoading = () => (
  <Placeholder>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);

const ModuleContent = ({ module, loading, error }) => {
  if (loading) {
    return <ModuleLoading />;
  } else if (error) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <React.Fragment>
      <p>Id: {module._id}</p>
      <p>Name: {module.name}</p>
    </React.Fragment>
  );
};

const propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  module: PropTypes.object
};

ModuleContent.propTypes = propTypes;

export const Module = ({ module, loading, error }) => {
  return (
    <ContentContainer loading={loading} header="Module">
      <ModuleContent module={module} loading={loading} error={error} />
    </ContentContainer>
  );
};

Module.propTypes = propTypes;
