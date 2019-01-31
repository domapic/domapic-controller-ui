import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { RoutesContext } from "src/contexts/RoutesContext";
import { UserAvatar } from "./UserAvatar";

import "./userMenuDropdown.css";

class AvatarButton extends Component {
  render() {
    return (
      <Button circular className="user-menu-dropdown__button">
        <UserAvatar loading={this.props.loading} email={this.props.email} />
      </Button>
    );
  }
}

export class UserMenuDropdown extends Component {
  render() {
    return (
      <Dropdown
        trigger={<AvatarButton loading={this.props.loading} email={this.props.user.email} />}
        pointing="top right"
        className="user-menu-dropdown"
      >
        <Dropdown.Menu>
          <Dropdown.Header>User</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to={this.context.account}>
              <Icon name="user" /> Account
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="" onClick={this.props.logoutHandler}>
              <Icon name="shutdown" /> Logout
            </Link>
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
