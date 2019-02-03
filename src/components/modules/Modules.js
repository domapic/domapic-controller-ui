import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { List, Placeholder } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";

import "./modules.css";

export const ModuleItem = ({ baseUrl, module }) => (
  <List.Item>
    <Link to={`${baseUrl}/${module._id}`}>
      <List.Content>
        <List.Header>{module.name}</List.Header>
        <List.Description>{module.description}</List.Description>
      </List.Content>
    </Link>
  </List.Item>
);

ModuleItem.propTypes = {
  baseUrl: PropTypes.string,
  module: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
};

export const Modules = ({ loading, modules, error, baseUrl }) => (
  <Container loading={loading} error={error}>
    <Container.Header>Modules</Container.Header>
    <Container.Search />
    <Container.Menu />
    <Container.Placeholder>
      <Placeholder.Paragraph>
        <Placeholder.Line as="h1" />
        <Placeholder.Line as="h2" />
      </Placeholder.Paragraph>
    </Container.Placeholder>
    <Container.Content>
      <List divided selection size="large" className="modules_list">
        {modules.map(module => (
          <ModuleItem key={module._id} module={module} baseUrl={baseUrl} />
        ))}
      </List>
    </Container.Content>
  </Container>
);

Modules.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  modules: PropTypes.array
};
