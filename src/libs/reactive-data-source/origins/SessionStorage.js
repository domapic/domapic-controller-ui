import { Storage } from "./Storage";

export class SessionStorage extends Storage {
  constructor(namespace, config, root = window) {
    super(namespace, root.sessionStorage, `session-storage-${namespace}`, config);
  }
}
