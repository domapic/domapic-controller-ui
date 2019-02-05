import React from "react";
import PropTypes from "prop-types";

import { Component as ItemInfo } from "src/components/item-info";

export const ServiceInfo = ({ loading, service = {} }) => (
  <ItemInfo
    loading={loading}
    data={[
      {
        label: "Name",
        value: service.name
      },
      {
        label: "Description",
        value: service.description
      },
      {
        label: "Package name",
        value: service.package
      },
      {
        label: "Package version",
        value: service.version
      },
      {
        label: "Url",
        value: service.url
      }
    ]}
  />
);

ServiceInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  service: PropTypes.any.isRequired
};
