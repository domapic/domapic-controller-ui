import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { RoutesContext } from "src/contexts/RoutesContext";
import { Component as UserAvatar } from "src/components/user-avatar";

import "./userMenuDropdown.css";

class AvatarButton extends Component {
  render() {
    return (
      <Button circular className="user-menu-dropdown__button">
        <UserAvatar {...this.props} />
      </Button>
    );
  }
}

export class UserMenuDropdown extends Component {
  render() {
    return (
      <Dropdown
        trigger={<AvatarButton {...this.props} />}
        pointing="top right"
        className="user-menu-dropdown"
      >
        <Dropdown.Menu>
          <Dropdown.Header>User</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to={this.context.account}>
            <Icon name="user" /> Account
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="" onClick={this.props.logoutHandler}>
            <Icon name="shutdown" /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

UserMenuDropdown.contextType = RoutesContext;

UserMenuDropdown.propTypes = {
  logoutHandler: PropTypes.func.isRequired
};
