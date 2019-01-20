import { Storage } from "./Storage";

export class SessionStorage extends Storage {
  constructor(namespace) {
    super(namespace, sessionStorage, `session-storage-${namespace}`);
  }
}
