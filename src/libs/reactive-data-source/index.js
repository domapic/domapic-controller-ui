import { DataSource } from "./bases/DataSource";
import { Selector } from "./bases/Selector";

import { reactConnect as connect } from "./plugins/react-connect";
import * as reduxDebug from "./plugins/redux-debug";

import { Api } from "./origins/Api";
import { LocalStorage } from "./origins/LocalStorage";
import { SessionStorage } from "./origins/SessionStorage";
import { MemoryStorage } from "./origins/MemoryStorage";

const plugins = {
  connect,
  reduxDebug
};

const origins = {
  Api,
  LocalStorage,
  SessionStorage,
  MemoryStorage
};

export { DataSource, Selector, plugins, origins };
