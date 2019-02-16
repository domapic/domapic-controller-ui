import React from "react";
import PropTypes from "prop-types";

import { Component as Container } from "src/components/container-content";
import { Component as ItemInfo } from "src/components/item-info";

export const About = ({ loading, error, about = {} }) => {
  return (
    <Container loading={loading} error={error} background={true}>
      <Container.Header as="h3">About this package</Container.Header>
      <Container.Content>
        <ItemInfo
          loading={loading}
          data={[
            {
              label: "Name",
              value: about.name
            },
            {
              label: "Description",
              value: about.description
            },
            {
              label: "Package name",
              value: about.package
            },
            {
              label: "Package version",
              value: about.version
            },
            {
              label: "License",
              value: about.license
            },
            {
              label: "Home Page",
              value: about.homepage
            },
            {
              label: "Author",
              value: about.author
            }
          ]}
        />
      </Container.Content>
    </Container>
  );
};

About.propTypes = {
  about: PropTypes.any.isRequired,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired
};
