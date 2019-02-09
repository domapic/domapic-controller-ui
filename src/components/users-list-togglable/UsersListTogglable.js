import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Menu } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";

import "./usersListTogglable.css";

const ToggleSystemUsers = ({ onChange }) => (
  <Container.Menu>
    <Menu.Item className="menu-toggle">
      Show system users <Checkbox toggle onChange={onChange} />
    </Menu.Item>
  </Container.Menu>
);

ToggleSystemUsers.propTypes = {
  onChange: PropTypes.func
};

ToggleSystemUsers.displayName = Container.Menu.displayName;

export class UsersListTogglable extends Component {
  constructor() {
    super();
    this.state = {
      showSystem: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState(state => ({
      showSystem: !state.showSystem
    }));
  }

  render() {
    const UsersContainer = this.props.usersContainer;
    const UsersList = this.props.usersList;
    return (
      <UsersContainer
        baseUrl={this.props.baseUrl}
        header="Users"
        sortBy={this.props.sortByChoices[0]}
        sortOrder="asc"
        sortByChoices={this.props.sortByChoices}
        menu={<ToggleSystemUsers onChange={this.onChange} />}
      >
        <UsersList baseUrl={this.props.baseUrl} showSystem={this.state.showSystem} />
      </UsersContainer>
    );
  }
}

UsersListTogglable.propTypes = {
  baseUrl: PropTypes.string,
  sortByChoices: PropTypes.array,
  usersContainer: PropTypes.func,
  usersList: PropTypes.func
};
