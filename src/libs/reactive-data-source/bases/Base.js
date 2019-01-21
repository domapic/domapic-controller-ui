import isFunction from "lodash.isfunction";
import merge from "lodash.merge";
import cloneDeep from "lodash.cloneDeep";

import { EventEmitter } from "./EventEmitter";
import {
  CHANGE_ANY_EVENT_NAME,
  CLEAN_ANY_EVENT_NAME,
  cleanCacheEventName,
  changeEventName,
  filterId,
  actions
} from "./helpers";

export class Base {
  constructor() {
    this._eventEmitter = new EventEmitter();
    this.filters = {};
    this.customFilters = {};
  }

  _emitChange(filter, method) {
    this._eventEmitter.emit(changeEventName(filter), method);
  }

  _onChange(listener, filter) {
    this._eventEmitter.on(changeEventName(filter), listener);
  }

  _removeChangeListener(listener, filter) {
    this._eventEmitter.removeListener(changeEventName(filter), listener);
  }

  _emitChangeAny(details) {
    this._eventEmitter.emit(CHANGE_ANY_EVENT_NAME, details);
  }

  _onChangeAny(listener) {
    this._eventEmitter.on(CHANGE_ANY_EVENT_NAME, listener);
  }

  _removeChangeAnyListener(listener) {
    this._eventEmitter.removeListener(CHANGE_ANY_EVENT_NAME, listener);
  }

  _onceClean(listener, filter) {
    this._eventEmitter.once(cleanCacheEventName(filter), listener);
  }

  _onClean(listener, filter) {
    this._eventEmitter.on(cleanCacheEventName(filter), listener);
  }

  _removeCleanListener(listener, filter) {
    this._eventEmitter.removeListener(cleanCacheEventName(filter), listener);
  }

  _onCleanAny(listener) {
    this._eventEmitter.on(CLEAN_ANY_EVENT_NAME, listener);
  }

  _removeCleanAnyListener(listener) {
    this._eventEmitter.removeListener(CLEAN_ANY_EVENT_NAME, listener);
  }

  filter(originalFilter) {
    const filter = cloneDeep(originalFilter);
    const filterUniqueId = filterId(filter);
    if (this.filters[filterUniqueId]) {
      return this.filters[filterUniqueId];
    }
    const newFilter = this._createFilteredMethods(filter, filterUniqueId);
    newFilter.onChange = listener => this._onChange(listener, filter);
    newFilter.removeChangeListener = listener => this._removeChangeListener(listener, filter);
    newFilter.onChangeAny = listener => this._onChangeAny(listener);
    newFilter.removeChangeAnyListener = listener => this._removeChangeAnyListener(listener);
    newFilter.clean = () => this._clean(filter);
    newFilter.onceClean = listener => this._onceClean(listener, filter);
    newFilter.onClean = listener => this._onClean(listener, filter);
    newFilter.removeCleanListener = listener => this._removeCleanListener(listener, filter);
    newFilter.onCleanAny = listener => this._onCleanAny(listener);
    newFilter.removeCleanAnyListener = listener => this._removeCleanAnyListener(listener);
    newFilter._filterId = filterUniqueId;
    newFilter._id = `${this._id}${filterUniqueId ? `-${filterUniqueId}` : ""}`;
    newFilter.actions = actions;

    newFilter.filter = filterExtension => this.filter(merge(filter, filterExtension));

    Object.keys(this.customFilters).forEach(filterKey => {
      newFilter[filterKey] = filterExtension => {
        return newFilter.filter(this.customFilters[filterKey](filterExtension));
      };
    });

    this.filters[filterUniqueId] = newFilter;

    return this.filters[filterUniqueId];
  }

  _createBaseMethods() {
    this._baseMethods = this.filter();

    Object.keys(this._baseMethods).forEach(baseMethod => {
      if (
        !this[baseMethod] &&
        this._baseMethods[baseMethod] &&
        (isFunction(this._baseMethods[baseMethod]) ||
          isFunction(this._baseMethods[baseMethod].dispatch) ||
          baseMethod === "actions")
      ) {
        this[baseMethod] = this._baseMethods[baseMethod];
      }
    });
  }

  addCustomFilters(customFilters) {
    Object.keys(customFilters).forEach(filterKey => {
      this.customFilters[filterKey] = customFilters[filterKey];
      this[filterKey] = originalFilter => {
        const filter = cloneDeep(originalFilter);
        return this.filter(customFilters[filterKey](filter))
      };
    });
  }

  addCustomFilter(customFilter) {
    this.addCustomFilters(customFilter);
  }
}
