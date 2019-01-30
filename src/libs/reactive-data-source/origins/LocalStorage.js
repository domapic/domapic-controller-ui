import { Storage } from "./Storage";

export class LocalStorage extends Storage {
  constructor(namespace, config, root = window) {
    super(namespace, root.localStorage, `local-storage-${namespace}`, config);
  }
}
