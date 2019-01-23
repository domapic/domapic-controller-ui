import { Storage } from "./Storage";

export class LocalStorage extends Storage {
  constructor(namespace, config) {
    super(namespace, localStorage, `local-storage-${namespace}`, config);
  }
}
