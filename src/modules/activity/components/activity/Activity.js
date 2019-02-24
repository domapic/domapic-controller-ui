import React from "react";
import PropTypes from "prop-types";

import { Component as PaginatedList } from "src/components/paginated-list";
import { Component as Container } from "src/components/container-content";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import { Table } from "semantic-ui-react";

const ListWrapper = ({ children }) => (
  <Table unstackable compact basic size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>At</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Module</Table.HeaderCell>
        <Table.HeaderCell>Ability</Table.HeaderCell>
        <Table.HeaderCell>Data</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>{children}</Table.Body>
  </Table>
);

ListWrapper.propTypes = {
  children: PropTypes.node
};

export const Activity = ({ LogsList, pageSize, logsCount, logsCountLoading }) => {
  return (
    <Container background={true}>
      <Container.Header>
        <Breadcrumbs sections={[{ text: "Activity", icon: "history" }]} />
      </Container.Header>
      <Container.Content>
        <PaginatedList
          List={LogsList}
          ListWrapper={ListWrapper}
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
