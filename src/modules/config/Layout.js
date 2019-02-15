import React from "react";
import PropTypes from "prop-types";
import { plugins } from "reactive-data-source";

import { BaseConfig } from "./views/BaseConfig";
import { CustomConfig } from "./views/CustomConfig";

import { customConfig } from "src/data-layer/config";

export const ConfigLayout = ({ customConfig }) => {
  const custom = customConfig.length ? (
    <CustomConfig title="Service custom configuration" />
  ) : null;
  return (
    <React.Fragment>
      <BaseConfig title="Base configuration" />
      {custom}
    </React.Fragment>
  );
};

ConfigLayout.propTypes = {
  customConfig: PropTypes.array
};

export const mapDataSourceToProps = () => {
  return {
    customConfig: customConfig.read.getters.value
  };
};

export const Config = plugins.connect(mapDataSourceToProps)(ConfigLayout);
