import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { throttle } from "lodash";

import { ScrollContext } from "src/contexts/ScrollContext";
import { Component as ErrorComponent } from "src/components/error";

export class ScrollPaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.loadMore = throttle(this.loadMore.bind(this), 500);
  }

  loadMore(page) {
    this.setState({
      currentPage: page
    });
  }

  hasMore() {
    return this.state.currentPage * this.props.pageSize < this.props.itemsCount.total + 1;
  }

  render() {
    const List = this.props.List;
    const ListWrapper = this.props.ListWrapper;
    const pages = [];
    if (this.props.itemsCountError) {
      return <ErrorComponent>{this.props.itemsCountError.message}</ErrorComponent>;
    }
    for (let i = 1; i < this.state.currentPage + 1; i++) {
      const listId = `paginated-list-${i}`;
      pages.push(
        <List
          page={i}
          key={listId}
          showPlaceHolders={this.props.pageSize}
          extraFilter={this.props.extraFilter}
          showError={i === 1}
        />
      );
    }
    if (!this.props.itemsCountLoading && this.props.itemsCount.total === 0) {
      return (
        <ListWrapper>
          <List showNoResults={true} showError={true} />
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
  itemsCountError: PropTypes.instanceOf(Error),
  itemsCountLoading: PropTypes.bool,
  pageSize: PropTypes.number
};
