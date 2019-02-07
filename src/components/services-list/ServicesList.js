import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { List } from "semantic-ui-react";

import "./servicesList.css";

export const Service = ({ baseUrl, item }) => (
  <List.Item>
    <Link to={`${baseUrl}/${item._id}`}>
      <List.Content>
        <List.Header>{item.name}</List.Header>
        <List.Description>{item.description}</List.Description>
      </List.Content>
    </Link>
  </List.Item>
);

Service.propTypes = {
  baseUrl: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
};

export const ServicesList = ({ list, baseUrl }) => (
  <List divided selection size="large" className="services-list">
    {list.map(item => (
      <Service key={item._id} item={item} baseUrl={baseUrl} />
    ))}
  </List>
);

ServicesList.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  list: PropTypes.array
};
