import { Storage } from "./Storage";

export class SessionStorage extends Storage {
  constructor(namespace, config) {
    super(namespace, sessionStorage, `session-storage-${namespace}`, config);
  }
}
