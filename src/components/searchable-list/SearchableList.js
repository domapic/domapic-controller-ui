import React, { Component } from "react";
import PropTypes from "prop-types";

import { Component as Container } from "src/components/container-content";

export class SearchableList extends Component {
  constructor(props) {
    super();
    this.state = {
      search: "",
      sortBy: props.sortBy,
      sortOrder: props.sortOrder
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSortByChange = this.onSortByChange.bind(this);
    this.onSortOrderChange = this.onSortOrderChange.bind(this);
  }

  childsWithFilters() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        search: this.state.search,
        sortBy: this.state.sortBy,
        sortOrder: this.state.sortOrder
      })
    );
  }

  onSearchChange(search) {
    this.setState(state => ({
      ...state,
      search
    }));
  }

  onSortByChange(sortBy) {
    this.setState(state => ({
      ...state,
      sortBy
    }));
  }

  onSortOrderChange(sortOrder) {
    this.setState(state => ({
      ...state,
      sortOrder
    }));
  }

  render() {
    return (
      <Container
        loading={this.props.loading}
        error={this.props.error}
        background={this.props.background}
      >
        <Container.Header>{this.props.header}</Container.Header>
        <Container.Search
          sortBy={this.props.sortByChoices}
          onSearchChange={this.onSearchChange}
          onSortByChange={this.onSortByChange}
          onSortOrderChange={this.onSortOrderChange}
          sortByActive={this.state.sortBy}
          sortOrderActive={this.state.sortOrder}
          searchValue={this.state.search}
        />
        {this.props.menu}
        <Container.Content>{this.childsWithFilters()}</Container.Content>
      </Container>
    );
  }
}

SearchableList.propTypes = {
  background: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.instanceOf(Error),
  header: PropTypes.node,
  loading: PropTypes.bool,
  menu: PropTypes.node,
  sortBy: PropTypes.string,
  sortByChoices: PropTypes.arrayOf(PropTypes.string),
  sortOrder: PropTypes.string
};
