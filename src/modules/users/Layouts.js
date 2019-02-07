import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Menu } from "semantic-ui-react";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";
import { Component as Container } from "src/components/container-content";
//import { User } from "./views/User";

import "./users.css";

const SORT_BY = ["name", "email", "role"];

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

// TODO, move to a component. Use clone to insert the "menu" property in UsersContainer child

ToggleSystemUsers.displayName = Container.Menu.displayName;

export class UsersLayout extends Component {
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
    return (
      <UsersContainer
        baseUrl={this.props.match.url}
        header="Users"
        sortBy={SORT_BY[0]}
        sortOrder="asc"
        sortByChoices={SORT_BY}
        menu={<ToggleSystemUsers onChange={this.onChange} />}
      >
        <UsersList baseUrl={this.props.match.url} showSystem={this.state.showSystem} />
      </UsersContainer>
    );
  }
}

UsersLayout.propTypes = {
  match: PropTypes.any.isRequired
};

/* export const UserLayout = ({ match }) => <User id={match.params.id} />;

UserLayout.propTypes = {
  match: PropTypes.any.isRequired
}; */
