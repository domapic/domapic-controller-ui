import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Menu, Button, Icon } from "semantic-ui-react";

import { RoutesContext } from "src/contexts/RoutesContext";

import { Component as Container } from "src/components/container-content";
import { Component as SearchableList } from "src/components/searchable-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import "./usersListContainer.css";

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

export class UsersListContainer extends Component {
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
    const UsersList = this.props.UsersList;
    const header = (
      <React.Fragment>
        <Breadcrumbs
          sections={[
            {
              url: this.context.users,
              text: "Users",
              icon: "user"
            }
          ]}
        />
        <Button floated="right" positive onClick={this.props.onClickNew}>
          <Icon name="plus" /> New
        </Button>
      </React.Fragment>
    );
    return (
      <SearchableList
        header={header}
        sortBy={this.props.sortByChoices[0]}
        sortOrder="asc"
        sortByChoices={this.props.sortByChoices}
        loading={this.props.loading}
        error={this.props.error}
        menu={<ToggleSystemUsers onChange={this.onChange} />}
        background={true}
      >
        <UsersList onClickUser={this.props.onClickUser} showSystem={this.state.showSystem} />
      </SearchableList>
    );
  }
}

UsersListContainer.contextType = RoutesContext;

UsersListContainer.propTypes = {
  UsersList: PropTypes.func,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  onClickNew: PropTypes.func,
  onClickUser: PropTypes.func,
  sortByChoices: PropTypes.array
};
