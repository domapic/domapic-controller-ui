import { plugins } from "reactive-data-source";

import { Modules as ModulesComponent } from "src/components/modules/Modules";

import { modules } from "src/data-sources/servicesCollection";

export const mapDataSourceToProps = () => ({
  modules: modules.read
});

export const Modules = plugins.connect(mapDataSourceToProps)(ModulesComponent);
