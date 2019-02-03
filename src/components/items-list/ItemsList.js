import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { List } from "semantic-ui-react";

import "./itemsList.css";

export const Item = ({ baseUrl, item }) => (
  <List.Item>
    <Link to={`${baseUrl}/${item._id}`}>
      <List.Content>
        <List.Header>{item.name}</List.Header>
        <List.Description>{item.description}</List.Description>
      </List.Content>
    </Link>
  </List.Item>
);

Item.propTypes = {
  baseUrl: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
};

export const ItemsList = ({ list, baseUrl }) => (
  <List divided selection size="large" className="items-list">
    {list.map(item => (
      <Item key={item._id} item={item} baseUrl={baseUrl} />
    ))}
  </List>
);

ItemsList.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  list: PropTypes.array
};
