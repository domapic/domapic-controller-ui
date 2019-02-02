import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

import { RoutesContext } from "src/contexts/RoutesContext";
import { UserAvatar } from "./UserAvatar";

import "./userMenuVertical.css";

export class UserMenuVertical extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu.Item className="user-menu-vertical__avatar">
          <UserAvatar {...this.props} />
          {this.props.user.name}
        </Menu.Item>
        <Menu.Item>
          User
          <Menu.Menu>
            <Menu.Item className="user-menu-vertical__item">
              <Link to={this.context.account}>Account</Link>
            </Menu.Item>
            <Menu.Item className="user-menu-vertical__item">
              <Link to="" onClick={this.props.logoutHandler}>
                Logout
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </React.Fragment>
    );
  }
}

UserMenuVertical.contextType = RoutesContext;

UserMenuVertical.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string
  })
};
