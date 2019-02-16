import React from "react";
import PropTypes from "prop-types";
import { plugins } from "reactive-data-source";

import { BaseConfig } from "./BaseConfig";
import { CustomConfig } from "./CustomConfig";

import { customConfig } from "src/data-layer/service";

export const ConfigView = ({ customConfig }) => {
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

ConfigView.propTypes = {
  customConfig: PropTypes.array
};

export const mapDataSourceToProps = () => {
  return {
    customConfig: customConfig.read.getters.value
  };
};

export const Config = plugins.connect(mapDataSourceToProps)(ConfigView);
