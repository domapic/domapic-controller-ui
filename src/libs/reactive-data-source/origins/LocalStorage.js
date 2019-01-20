import { Storage } from "./Storage";

export class LocalStorage extends Storage {
  constructor(namespace) {
    super(namespace, localStorage, `local-storage-${namespace}`);
  }
}
