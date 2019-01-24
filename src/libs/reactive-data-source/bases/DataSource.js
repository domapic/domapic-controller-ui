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
    this._cache.clean(filter);
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
                  error: null,
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

        const createGetter = prop => {
          const getter = () => methods[methodName][prop];
          getter.isGetter = true;
          getter.prop = prop;
          getter._method = methods[methodName];
          return getter;
        };

        methods[methodName].getters = {
          error: createGetter("error"),
          loading: createGetter("loading"),
          value: createGetter("value"),
          dispatch: createGetter("dispatch")
        };
      }
    });
    return methods;
  }
}
