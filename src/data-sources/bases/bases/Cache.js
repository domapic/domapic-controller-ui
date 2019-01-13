import { isObject, isArray } from "lodash";
import { filterId, cleanCacheEventName, isCacheEventName } from "./helpers";

export class Cache {
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._reset();
  }

  _reset() {
    this._cachedData = {};
    this._eventEmitter.eventNames.forEach(eventName => {
      if (isCacheEventName(eventName)) {
        this._eventEmitter.emit(eventName);
      }
    });
  }

  clean(filter) {
    console.log("cleaning cache", filterId(filter));
    if (filter) {
      delete this._cachedData[filterId(filter)];
      this._eventEmitter.emit(cleanCacheEventName(filter), filter);
    } else {
      this._reset();
    }
  }

  get(filter) {
    return this._cachedData[filterId(filter)];
  }

  set(filter, data) {
    this._cachedData[filterId(filter)] = isObject(data) || isArray(data) ? { ...data } : data;
  }
}
