import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, Icon, Label, Message } from "semantic-ui-react";

import "./servicesList.css";

export const NoResults = () => {
  return <Message size="large">No results</Message>;
};

export const Service = ({ baseUrl, item }) => {
  const icon = item.type === "module" ? "cube" : "plug";
  return (
    <Card fluid as={Link} to={`${baseUrl}/${item._id}`} className="service__container">
      <Card.Content>
        <Card.Header>
          <Icon name={icon} />
          {item.name}
        </Card.Header>
        <Card.Meta>Package: {item.package}</Card.Meta>
        <Card.Description>{item.description}</Card.Description>
        <div className="service__details">
          <Icon name="signal" />
          <Icon name="plug" />
          <Label> {item.version}</Label>
        </div>
      </Card.Content>
    </Card>
  );
};

Service.propTypes = {
  baseUrl: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
};

export const ServicesList = ({ list, listLoading, baseUrl }) => (
  <React.Fragment>
    {list.length < 1 && !listLoading ? <NoResults /> : null}
    {list.map(item => (
      <Service key={item._id} item={item} baseUrl={baseUrl} />
    ))}
  </React.Fragment>
);

ServicesList.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  list: PropTypes.array,
  listLoading: PropTypes.bool
};
