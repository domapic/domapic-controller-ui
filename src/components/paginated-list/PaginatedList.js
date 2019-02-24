import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import { ScrollContext } from "src/contexts/ScrollContext";

export class PaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(page) {
    this.setState({
      currentPage: page
    });
  }

  hasMore() {
    return this.state.currentPage * this.props.pageSize < this.props.itemsCount.total;
  }

  render() {
    const List = this.props.List;
    const ListWrapper = this.props.ListWrapper;
    const pages = [];
    for (let i = 0; i < this.state.currentPage + 1; i++) {
      pages.push(
        <List page={i} key={`paginated-list-${i}`} showPlaceHolders={this.props.pageSize} />
      );
    }
    return (
      <InfiniteScroll
        pageStart={0}
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

PaginatedList.contextType = ScrollContext;

PaginatedList.propTypes = {
  List: PropTypes.func,
  ListWrapper: PropTypes.func,
  itemsCount: PropTypes.any,
  // itemsCountLoading: PropTypes.bool,
  pageSize: PropTypes.number
};
