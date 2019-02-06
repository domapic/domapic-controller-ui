import React from "react";
import { plugins } from "reactive-data-source";

import { BaseConfig } from "./views/BaseConfig";
import { CustomConfig } from "./views/CustomConfig";

import { customConfig } from "src/data-sources/config";

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

export const mapDataSourceToProps = () => {
  return {
    customConfig: customConfig.read.getters.value
  };
};

export const Config = plugins.connect(mapDataSourceToProps)(ConfigLayout);
