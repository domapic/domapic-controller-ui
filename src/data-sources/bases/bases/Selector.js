import { once, isFunction } from "lodash";

import { Cache } from "./Cache";
import { EventEmitter } from "./EventEmitter";
import { cleanCacheEventName, filterId } from "./helpers";

export class Selector {
  constructor() {
    this._eventEmitter = new EventEmitter();
    this._cache = new Cache(this._eventEmitter);
    this.filters = {};

    const args = Array.from(arguments);
    const lastIndex = args.length - 1;
    this.dataSources = args.slice(0, lastIndex);
    this.resultsParser = args[lastIndex];

    this._createBaseMethods();
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

  _readAllDataSources(filter, methods) {
    console.log("Selector reading data sources", filter);
    const dataSourcesResults = [];
    const dataSources = [];
    const cleanFilter = once(() => {
      this._cache.clean(filter);
    });

    const readDataSource = dataSourceIndex => {
      const hasToFilter = !!this.dataSources[dataSourceIndex].source;
      const dataSource = hasToFilter
        ? this.dataSources[dataSourceIndex].source.filter(
            this.dataSources[dataSourceIndex].filter(filter, dataSourcesResults)
          )
        : this.dataSources[dataSourceIndex];
      dataSources.push(dataSource);
      methods.loading = true;
      return dataSource.read().then(dataSourceResult => {
        dataSourcesResults.push(dataSourceResult);
        if (dataSourceIndex < this.dataSources.length - 1) {
          return readDataSource(dataSourceIndex + 1);
        }
        return Promise.resolve(this.resultsParser.apply(null, dataSourcesResults));
      });
    };

    const readDataSources = () => readDataSource(0);

    return readDataSources()
      .then(result => {
        methods.error = null;
        methods.loading = false;
        methods.value = result;
        console.log("Attaching listeners to clean cache when data sources clean", filter);
        dataSources.map(dataSource => {
          dataSource.onceClean(cleanFilter);
        });
        return Promise.resolve(result);
      })
      .catch(error => {
        methods.error = error;
        methods.loading = false;
        return Promise.reject(error);
      });
  }

  _read(filter, methods) {
    const cached = this._cache.get(filter);
    if (cached) {
      console.log("Returning selector from cache", filter);
      return cached.resultPromise;
    }
    const resultPromise = this._readAllDataSources(filter, methods);
    this._cache.set(filter, { resultPromise });
    return resultPromise;
  }

  filter(filter) {
    const filterUniqueId = filterId(filter);
    if (this.filters[filterUniqueId]) {
      return this.filters[filterUniqueId];
    }

    const methods = {
      value: null,
      error: null,
      loading: false
    };

    methods.read = () => this._read(filter, methods);
    methods.clean = () => this._cache.clean(filter);
    methods.onceClean = listener => this._onceClean(listener, filter);
    methods.onClean = listener => this._onClean(listener, filter);
    methods.removeCleanListener = listener => this._removeCleanListener(listener, filter);
    this.filters[filterUniqueId] = methods;
    return this.filters[filterUniqueId];
  }

  _createBaseMethods() {
    this._baseMethods = this.filter();

    Object.keys(this._baseMethods).map(baseMethod => {
      if (isFunction(this._baseMethods[baseMethod])) {
        this[baseMethod] = this._baseMethods[baseMethod];
      }
    });
  }

  get value() {
    return this._baseMethods.value;
  }

  get error() {
    return this._baseMethods.error;
  }

  get loading() {
    return this._baseMethods.loading;
  }
}
