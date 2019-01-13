import { isFunction, upperFirst } from "lodash";

import { Cache } from "./Cache";
import { EventEmitter } from "./EventEmitter";
import {
  READ_METHOD,
  VALID_METHODS,
  ERROR_ANY_EVENT,
  methodsEventNames,
  methodsBeforeEventNames,
  methodsAnyEventNames,
  methodsBeforeAnyEventNames,
  cleanCacheEventName,
  errorEventName,
  filterId
} from "./helpers";

export class DataSource {
  constructor(methods = {}, config = {}) {
    this._eventEmitter = new EventEmitter();
    if (config.cache) {
      this._cache = new Cache(this._eventEmitter);
    }
    this._methods = methods;
    this.filters = {};
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

  _emitClean(filter) {
    this._eventEmitter.emit(cleanCacheEventName(filter), filter);
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

  _onError(listener, filter) {
    this._eventEmitter.on(errorEventName(filter), listener);
  }

  _removeErrorListener(listener, filter) {
    this._eventEmitter.removeListener(errorEventName(filter), listener);
  }

  _onErrorAny(listener) {
    this._eventEmitter.on(ERROR_ANY_EVENT, listener);
  }

  _removeOnErrorAny(listener) {
    this._eventEmitter.removeListener(ERROR_ANY_EVENT, listener);
  }

  _emitError(filter) {
    this._eventEmitter.emit(ERROR_ANY_EVENT, filter);
    this._eventEmitter.emit(errorEventName(filter), filter);
  }

  _emitMethod(methodName, filter) {
    this._eventEmitter.emit(methodsAnyEventNames[methodName], filter);
    this._eventEmitter.emit(methodsEventNames[methodName](filter), filter);
  }

  _emitBeforeMethod(methodName, filter) {
    this._eventEmitter.emit(methodsBeforeAnyEventNames[methodName], filter);
    this._eventEmitter.emit(methodsBeforeEventNames[methodName](filter), filter);
  }

  _createFilteredMethods(filter) {
    const methods = {
      value: null,
      error: null,
      loading: false
    };

    const defaultExtraAction = () => {
      methods.loading = false;
      methods.error = false;
    };

    const readExtraAction = result => {
      methods.loading = false;
      methods.error = false;
      methods.value = result;
    };

    VALID_METHODS.map(methodName => {
      if (this._hasToPublishMethod(methodName)) {
        let extraAction = methodName === READ_METHOD ? readExtraAction : defaultExtraAction;
        methods[methodName] = extraParams => {
          methods.loading = true;
          this._emitBeforeMethod(methodName, filter);
          return this[`_${methodName}`](filter, extraParams)
            .then(result => {
              extraAction(result);
              this._emitMethod(methodName, filter);
              return Promise.resolve(result);
            })
            .catch(error => {
              methods.loading = false;
              methods.error = error;
              this._emitError(filter);
              return Promise.reject(error);
            });
        };
      }
    });

    const createMethodListeners = () => {
      Object.keys(methodsEventNames).forEach(methodEventName => {
        const upperMethodEventName = upperFirst(methodEventName);

        methods[`on${upperMethodEventName}`] = listener => {
          this._eventEmitter.on(methodsEventNames[methodEventName](filter), listener);
        };

        methods[`remove${upperMethodEventName}Listener`] = listener => {
          this._eventEmitter.removeListener(methodsEventNames[methodEventName](filter), listener);
        };

        methods[`onBefore${upperMethodEventName}`] = listener => {
          this._eventEmitter.on(methodsBeforeEventNames[methodEventName](filter), listener);
        };

        methods[`removeOnBefore${upperMethodEventName}Listener`] = listener => {
          this._eventEmitter.removeListener(
            methodsBeforeEventNames[methodEventName](filter),
            listener
          );
        };

        methods[`on${upperMethodEventName}Any`] = listener => {
          this._eventEmitter.on(methodsAnyEventNames[methodEventName], listener);
        };

        methods[`remove${upperMethodEventName}AnyListener`] = listener => {
          this._eventEmitter.removeListener(methodsAnyEventNames[methodEventName], listener);
        };

        methods[`onBefore${upperMethodEventName}Any`] = listener => {
          this._eventEmitter.on(methodsBeforeAnyEventNames[methodEventName], listener);
        };

        methods[`removeOnBefore${upperMethodEventName}AnyListener`] = listener => {
          this._eventEmitter.removeListener(methodsBeforeAnyEventNames[methodEventName], listener);
        };
      });
    };

    methods.clean = () => this._clean(filter);
    methods.emitClean = () => this._emitClean(filter);
    methods.onceClean = listener => this._onceClean(listener, filter);
    methods.onClean = listener => this._onClean(listener, filter);
    methods.removeCleanListener = listener => this._removeCleanListener(listener, filter);

    methods.onError = listener => this._onError(listener, filter);
    methods.onErrorAny = listener => this._onErrorAny(listener);
    methods.removeErrorListener = listener => this._removeErrorListener(listener, filter);
    methods.removeErrorAnyListener = listener => this._removeErrorAnyListener(listener);

    createMethodListeners();

    return methods;
  }

  filter(filter) {
    const filterUniqueId = filterId(filter);
    if (this.filters[filterUniqueId]) {
      return this.filters[filterUniqueId];
    }
    this.filters[filterUniqueId] = this._createFilteredMethods(filter, filterUniqueId);
    return this.filters[filterUniqueId];
  }

  _publishBaseMethod(methodName) {
    if (this._baseMethods[methodName]) {
      this[methodName] = this._baseMethods[methodName];
    }
  }

  _createBaseMethods() {
    this._baseMethods = this._createFilteredMethods();
    VALID_METHODS.forEach(this._publishBaseMethod.bind(this));

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
