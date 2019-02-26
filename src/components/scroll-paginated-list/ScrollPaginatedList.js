import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import { ScrollContext } from "src/contexts/ScrollContext";

export class ScrollPaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      hasLoaded: {}
    };
    this.loadMore = this.loadMore.bind(this);
    this.setLoaded = this.setLoaded.bind(this);
  }

  loadMore(page) {
    this.setState(state => ({
      ...state,
      currentPage: page
    }));
  }

  setLoaded(listId) {
    console.log("loaded", listId);
    this.setState(state => ({
      ...state,
      hasLoaded: {
        ...state.hasLoaded,
        [listId]: true
      }
    }));
  }

  hasMore() {
    return this.state.currentPage * this.props.pageSize < this.props.itemsCount.total + 1;
  }

  render() {
    const List = this.props.List;
    const ListWrapper = this.props.ListWrapper;
    const pages = [];
    for (let i = 1; i < this.state.currentPage + 1; i++) {
      const listId = `paginated-list-${i}`;
      pages.push(
        <List
          page={i}
          key={listId}
          showPlaceHolders={this.state.hasLoaded[listId] ? 0 : this.props.pageSize}
          extraFilter={this.props.extraFilter}
          onLoaded={() => {
            if (!this.state.hasLoaded[listId]) {
              this.setLoaded(listId);
            }
          }}
        />
      );
    }
    if (!this.props.itemsCountLoading && this.props.itemsCount.total === 0) {
      return (
        <ListWrapper>
          <List page={1} showPlaceHolders={0} extraFilter={this.props.extraFilter} />
        </ListWrapper>
      );
    }
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.loadMore}
        hasMore={this.hasMore()}
        initialLoad={true}
        threshold={this.context.useWindow ? -50 : -150}
        useWindow={this.context.useWindow}
        getScrollParent={this.context.getScrollContainer}
      >
        <ListWrapper>{pages.map(page => page)}</ListWrapper>
      </InfiniteScroll>
    );
  }
}

ScrollPaginatedList.contextType = ScrollContext;

ScrollPaginatedList.propTypes = {
  List: PropTypes.func,
  ListWrapper: PropTypes.func,
  extraFilter: PropTypes.any,
  itemsCount: PropTypes.any,
  itemsCountLoading: PropTypes.bool,
  pageSize: PropTypes.number
};
