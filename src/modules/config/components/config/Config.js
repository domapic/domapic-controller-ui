import React from "react";
import PropTypes from "prop-types";

import { Component as Container } from "src/components/container-content";
import { Component as ItemInfo } from "src/components/item-info";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

export const Config = ({ title, loading, error, config = [] }) => {
  return (
    <Container loading={loading} error={error} background={true}>
      <Container.Header>
        <Breadcrumbs
          sections={[
            {
              text: title,
              icon: "configure"
            }
          ]}
        />
      </Container.Header>
      <Container.Content>
        <ItemInfo loading={loading} data={config} />
      </Container.Content>
    </Container>
  );
};

Config.propTypes = {
  config: PropTypes.any.isRequired,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string
};
