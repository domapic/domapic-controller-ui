import { Storage } from "./Storage";

export class MemoryStorage extends Storage {
  constructor(namespace, value) {
    super(namespace, null, `memory-storage-${namespace}`, {});
    this._memory = value || {};
    this.update(this._memory);
  }

  _getRootValue() {
    return this._memory;
  }

  _setRootValue(value) {
    this._memory = value;
  }
}
