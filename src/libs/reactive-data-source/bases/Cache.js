import { CLEAN_ANY_EVENT_NAME, filterId, cleanCacheEventName, isCacheEventName } from "./helpers";

export class Cache {
  constructor(eventEmitter, id) {
    this._eventEmitter = eventEmitter;
    this._reset();
    this._id = id;
  }

  _reset() {
    this._cachedData = {};
    this._eventEmitter.eventNames.forEach(eventName => {
      if (isCacheEventName(eventName)) {
        this._eventEmitter.emit(eventName);
      }
    });
  }

  getAnyData(filterUniqueId) {
    return {
      action: "clean",
      source: {
        _id: `${this._id}${filterUniqueId ? `-${filterUniqueId}` : ""}`,
        _filterId: filterUniqueId
      }
    };
  }

  clean(filter) {
    if (filter) {
      const filterIdentifier = filterId(filter);
      delete this._cachedData[filterIdentifier];
      this._eventEmitter.emit(cleanCacheEventName(filter), filter);
      this._eventEmitter.emit(CLEAN_ANY_EVENT_NAME, this.getAnyData(filterIdentifier));
    } else {
      this._reset();
      this._eventEmitter.emit(CLEAN_ANY_EVENT_NAME, this.getAnyData());
    }
  }

  get(filter) {
    return this._cachedData[filterId(filter)];
  }

  set(filter, data) {
    this._cachedData[filterId(filter)] = data;
  }
}
