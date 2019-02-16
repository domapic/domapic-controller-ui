import { plugins } from "reactive-data-source";

import { Component as AboutComponent } from "../components/about";

import { about } from "src/data-layer/about";

export const mapDataSourceToProps = () => {
  return {
    about: about.read.getters.value,
    error: about.read.getters.error,
    loading: about.read.getters.loading
  };
};

export const About = plugins.connect(mapDataSourceToProps)(AboutComponent);
