import React from "react";
// import PropTypes from "prop-types";

import { Menu, Dropdown, Input } from "semantic-ui-react";

import "./search.css";

export const Search = () => (
  <React.Fragment>
    <Menu.Item>
      <Input icon="search" placeholder="Search..." />
    </Menu.Item>
    <Menu.Menu>
      <Dropdown item text="Sort" className="search__dropdown" pointing="top right" icon="sort">
        <Dropdown.Menu size="mini">
          <Dropdown.Header>By</Dropdown.Header>
          <Dropdown.Item active>Name</Dropdown.Item>
          <Dropdown.Item>Description</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item active>Asc</Dropdown.Item>
          <Dropdown.Item>Desc</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </React.Fragment>
);

/* Search.propTypes = {
  children: PropTypes.node
}; */
