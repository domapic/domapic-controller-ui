import React from "react";
import PropTypes from "prop-types";

import { Component as ScrollPaginatedList } from "src/components/scroll-paginated-list";
import { Component as Container } from "src/components/container-content";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { Component as LogsListTable } from "src/components/logs-list-table";

export const Activity = ({ LogsList, pageSize, logsCount, logsCountLoading }) => {
  return (
    <Container background={true}>
      <Container.Header>
        <Breadcrumbs sections={[{ text: "Activity", icon: "history" }]} />
      </Container.Header>
      <Container.Content>
        <ScrollPaginatedList
          List={LogsList}
          ListWrapper={LogsListTable}
          pageSize={pageSize}
          itemsCount={logsCount}
          itemsCountLoading={logsCountLoading}
        />
      </Container.Content>
    </Container>
  );
};

Activity.propTypes = {
  LogsList: PropTypes.func,
  logsCount: PropTypes.any,
  logsCountLoading: PropTypes.bool,
  pageSize: PropTypes.number
};
