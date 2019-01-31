import { DataSource } from "../bases/DataSource";

const defaultMethods = {
  read: true,
  create: true,
  update: true,
  delete: true
};

export class Storage extends DataSource {
  constructor(namespace, storage, id, config) {
    super(defaultMethods, id, config && config.defaultValue);
    this._id = id;
    this._namespace = namespace;
    this._storage = storage;
  }

  _getRootValue() {
    const rootValue = this._storage.getItem(this._namespace);
    return rootValue ? JSON.parse(rootValue) : {};
  }

  _setRootValue(value) {
    this._storage.setItem(this._namespace, JSON.stringify(value));
  }

  _read(key) {
    const cached = this._cache.get(key);
    if (cached) {
      return cached;
    }
    const promise = Promise.resolve(key ? this._getRootValue()[key] : this._getRootValue());
    this._cache.set(key, promise);
    return promise;
  }

  _update(filter, data) {
    let rootValue;
    if (filter) {
      rootValue = this._getRootValue();
      rootValue[filter] = data;
    } else {
      rootValue = data;
    }
    this._setRootValue(rootValue);
    this._clean(filter);
    return Promise.resolve();
  }

  _create(filter, data) {
    this._update(filter, data);
    this._clean();
    return Promise.resolve();
  }

  _delete(filter) {
    const rootValue = this._getRootValue();
    if (filter) {
      delete rootValue[filter];
      this._setRootValue(rootValue);
    } else {
      this._setRootValue({});
    }
    this._clean();
    return Promise.resolve();
  }
}
