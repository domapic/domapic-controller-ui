import once from "lodash.once";
import isFunction from "lodash.isfunction";

import { Base } from "./Base";
import { Cache } from "./Cache";
import { READ_METHOD, actions } from "./helpers";

export class Selector extends Base {
  constructor() {
    super();

    const args = Array.from(arguments);
    let lastIndex = args.length - 1;

    this._defaultValue = null;

    // Check if last argument is default value
    if (!isFunction(args[lastIndex])) {
      this._defaultValue = args[lastIndex];
      lastIndex = args.length - 2;
    }

    this.dataSources = args.slice(0, lastIndex);
    this.resultsParser = args[lastIndex];
    this._id = "select-";
    this.dataSources.forEach(dataSource => {
      this._id = `${this._id}${dataSource.source ? dataSource.source._id : dataSource._id}`;
    });

    this._cache = new Cache(this._eventEmitter, this._id);

    this._createBaseMethods();
  }

  _clean(filter) {
    this._cache.clean(filter);
  }

  _readAllDataSources(filter, methods, filterUniqueId) {
    const dataSourcesResults = [];
    const dataSources = [];
    const cleanFilter = once(() => {
      this._cache.clean(filter);
    });

    const updateData = (data, action) => {
      const newData = {
        value: methods[READ_METHOD].value,
        error: methods[READ_METHOD].error,
        loading: methods[READ_METHOD].loading,
        ...data
      };
      methods[READ_METHOD].value = newData.value;
      methods[READ_METHOD].loading = newData.loading;
      methods[READ_METHOD].error = newData.error;
      this._emitChange(filter, READ_METHOD);
      this._emitChangeAny({
        source: this.filters[filterUniqueId],
        method: READ_METHOD,
        action
      });
    };

    const readDataSource = dataSourceIndex => {
      const hasToFilter = !!this.dataSources[dataSourceIndex].source;
      const dataSource = hasToFilter
        ? this.dataSources[dataSourceIndex].source.filter(
            this.dataSources[dataSourceIndex].filter(filter, dataSourcesResults)
          )
        : this.dataSources[dataSourceIndex];
      dataSources.push(dataSource);
      return dataSource[READ_METHOD].dispatch().then(dataSourceResult => {
        dataSourcesResults.push(dataSourceResult);
        if (dataSourceIndex < this.dataSources.length - 1) {
          return readDataSource(dataSourceIndex + 1);
        }
        return Promise.resolve(this.resultsParser.apply(null, dataSourcesResults.concat(filter)));
      });
    };

    updateData(
      {
        error: null,
        loading: true
      },
      actions[READ_METHOD].dispatch
    );
    return readDataSource(0)
      .then(result => {
        updateData(
          {
            error: null,
            loading: false,
            value: result
          },
          actions[READ_METHOD].success
        );
        dataSources.forEach(dataSource => {
          dataSource.onceClean(cleanFilter);
        });
        return Promise.resolve(result);
      })
      .catch(error => {
        updateData(
          {
            error: error,
            loading: false
          },
          actions[READ_METHOD].error
        );
        dataSources.forEach(dataSource => {
          dataSource.onceClean(cleanFilter);
        });
        this._cache.set(filter, null);
        return Promise.reject(error);
      });
  }

  _read(filter, methods, filterUniqueId) {
    const cached = this._cache.get(filter);
    if (cached) {
      return cached;
    }
    const resultPromise = this._readAllDataSources(filter, methods, filterUniqueId);
    this._cache.set(filter, resultPromise);
    return resultPromise;
  }

  _createFilteredMethods(filter, filterUniqueId) {
    const methods = {};
    const dispatchMethod = () => this._read(filter, methods, filterUniqueId);

    methods[READ_METHOD] = dispatchMethod;
    methods[READ_METHOD].dispatch = () => this._read(filter, methods, filterUniqueId);
    methods[READ_METHOD].value = this._defaultValue;
    methods[READ_METHOD].error = null;
    methods[READ_METHOD].loading = false;
    methods[READ_METHOD]._source = methods;
    methods[READ_METHOD]._isDataSource = true;
    methods[READ_METHOD]._methodName = READ_METHOD;

    const createGetter = prop => {
      const getter = () => methods[READ_METHOD][prop];
      getter.isGetter = true;
      getter.prop = prop;
      getter._isDataSource = true;
      getter._method = methods[READ_METHOD];
      return getter;
    };

    methods[READ_METHOD].getters = {
      error: createGetter("error"),
      loading: createGetter("loading"),
      value: createGetter("value"),
      dispatch: createGetter("dispatch")
    };

    return methods;
  }
}
