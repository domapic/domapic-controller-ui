import { Storage } from "./Storage";

export class MemoryStorage extends Storage {
  constructor(namespace, config) {
    super(namespace, null, `memory-storage-${namespace}`, config);
    this._memory = (config && config.defaultValue) || {};
  }

  _getRootValue() {
    return this._memory;
  }

  _setRootValue(value) {
    this._memory = value;
  }
}
