import { plugins } from "reactive-data-source";

import { Modules as ModulesComponent } from "src/components/modules/Modules";

import { modulesCollection } from "src/data-sources/servicesCollection";

export const mapDataSourceToProps = () => ({
  modules: modulesCollection.read
});

export const Modules = plugins.connect(mapDataSourceToProps)(ModulesComponent);
