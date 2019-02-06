import { plugins } from "reactive-data-source";

import { Component as Services } from "src/components/services";

import { modulesCollection } from "src/data-sources/services";

export const mapDataSourceToProps = () => ({
  loading: modulesCollection.read.getters.loading,
  error: modulesCollection.read.getters.error
});

export const ModulesContainer = plugins.connect(mapDataSourceToProps)(Services);