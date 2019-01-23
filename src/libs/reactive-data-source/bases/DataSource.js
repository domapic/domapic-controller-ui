import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";

import { Base } from "./Base";
import { Cache } from "./Cache";
import { VALID_METHODS, actions } from "./helpers";

export class DataSource extends Base {
  constructor(methods = {}, id = "", defaultValue = null) {
    super();
    this._cache = new Cache(this._eventEmitter, id);
    this._id = id;
    this._methods = methods;
    this._defaultValue = cloneDeep(defaultValue);
    this._createBaseMethods();
  }

  _hasToPublishMethod(methodName) {
    return this._methods[methodName] && this[`_${methodName}`];
  }

  _clean(filter) {
    if (this._cache) {
      this._cache.clean(filter);
    }
  }

  _createFilteredMethods(filter, filterId) {
    const methods = {};

    const updateData = (data, methodName, action, params) => {
      const oldData = {
        value: methods[methodName].value,
        error: methods[methodName].error,
        loading: methods[methodName].loading
      };
      const newData = {
        value: methods[methodName].value,
        error: methods[methodName].error,
        loading: methods[methodName].loading,
        ...data
      };
      if (!isEqual(oldData, newData)) {
        methods[methodName].value = newData.value;
        methods[methodName].loading = newData.loading;
        methods[methodName].error = newData.error;
        this._emitChange(filter, methodName);
        this._emitChangeAny({
          source: this.filters[filterId],
          method: methodName,
          action,
          params
        });
      }
    };

    VALID_METHODS.forEach(methodName => {
      if (this._hasToPublishMethod(methodName)) {
        const dispatchMethod = extraParams => {
          const methodPromise = this[`_${methodName}`](filter, extraParams);
          if (!methodPromise.isFulfilled) {
            updateData(
              {
                loading: true
              },
              methodName,
              actions[methodName].dispatch,
              extraParams
            );
          }
          return methodPromise
            .then(result => {
              updateData(
                {
                  loading: false,
                  error: false,
                  value: result
                },
                methodName,
                actions[methodName].success,
                extraParams
              );
              methodPromise.isFulfilled = true;
              return Promise.resolve(result);
            })
            .catch(error => {
              updateData(
                {
                  loading: false,
                  error
                },
                methodName,
                actions[methodName].error,
                extraParams
              );
              methodPromise.isFulfilled = true;
              return Promise.reject(error);
            });
        };

        methods[methodName] = dispatchMethod;
        methods[methodName].dispatch = dispatchMethod;
        methods[methodName].value = this._defaultValue;
        methods[methodName].error = null;
        methods[methodName].loading = false;
        methods[methodName]._source = methods;
        methods[methodName]._methodName = methodName;

        methods[methodName].get = prop => ({
          isGetter: true,
          prop,
          _method: methods[methodName]
        });

        methods[methodName].getError = () => methods[methodName].get("error");
        methods[methodName].getValue = () => methods[methodName].get("value");
        methods[methodName].getLoading = () => methods[methodName].get("loading");
        methods[methodName].getDispatch = () => methods[methodName].get("dispatch");
      }
    });
    return methods;
  }
}
