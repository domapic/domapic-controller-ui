import { once } from "lodash";
import pathToRegexp from "path-to-regexp";

import { DataSource } from "../bases/DataSource";

import axios from "axios";
import axiosRetry from "axios-retry";

const PATH_SEP = "/";

const defaultMethods = {
  read: true
};

const defaultConfig = {
  baseUrl: "",
  readMethod: "get",
  updateMethod: "patch",
  createMethod: "post",
  deleteMethod: "delete",
  authErrorStatus: 401,
  authErrorHandler: null,
  onBeforeRequest: null,
  onceBeforeRequest: null,
  expirationTime: 0,
  retries: 3,
  cache: true,
  fullResponse: false,
  validateStatus: status => status >= 200 && status < 300,
  errorHandler: error => {
    const errorMessage =
      (error.response && error.response.statusText) || error.message || "Request error";
    return Promise.reject(new Error(errorMessage));
  }
};

export class Api extends DataSource {
  constructor(url, methods = {}, config = {}) {
    const id = `api-${url}`;
    super({ ...defaultMethods, ...methods }, id, config && config.defaultValue);
    this._id = id;
    this._url = url;

    this._headers = {};

    const configuration = { ...defaultConfig, ...config };
    this._config(configuration);
    this._addOnBeforeRequest(configuration.onceBeforeRequest);
  }

  _addOnBeforeRequest(onceBeforeRequest) {
    this._onceBeforeRequest = onceBeforeRequest ? once(onceBeforeRequest) : null;
  }

  _config(configuration) {
    this._configuration = { ...configuration };

    this._readMethod = configuration.readMethod;
    this._updateMethod = configuration.updateMethod;
    this._createMethod = configuration.createMethod;
    this._deleteMethod = configuration.deleteMethod;
    this._authErrorStatus = configuration.authErrorStatus;
    this._authErrorHandler = configuration.authErrorHandler;
    this._useCache = configuration.cache;
    this._fullResponse = configuration.fullResponse;
    this._validateStatus = configuration.validateStatus;
    this._errorHandler = configuration.errorHandler;
    this._baseUrl = configuration.baseUrl;
    this._onBeforeRequest = configuration.onBeforeRequest;

    this.client = axios.create();

    axiosRetry(this.client, {
      retries: configuration.retries
    });

    if (this.cleanInterval) {
      clearInterval(this.cleanInterval);
    }

    if (configuration.expirationTime > 0) {
      this.cleanInterval = setInterval(() => this.clean(), configuration.expirationTime);
    }

    this._setUrl(this._baseUrl + this._url);
  }

  config(configuration) {
    this._config({ ...this._configuration, ...configuration });
    this._addOnBeforeRequest(configuration.onceBeforeRequest);
  }

  _getQueryString(query) {
    if (!query) {
      return "";
    }
    return (
      "?" +
      Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join("&")
    );
  }

  _getUrl(filter = {}) {
    if (filter.params) {
      return `${this.url.base}/${this.url.segment(filter.params)}${this._getQueryString(
        filter.query
      )}`;
    }
    return `${this.url.full}${this._getQueryString(filter.query)}`;
  }

  _setUrl(baseUrl) {
    const splittedUrl = baseUrl.split(PATH_SEP).filter(pathPortion => pathPortion !== "");
    const hasProtocol = splittedUrl[0].indexOf("http") > -1;

    this.url = {
      base: hasProtocol ? `${splittedUrl[0]}//${splittedUrl[1]}` : "",
      full: baseUrl,
      segment: pathToRegexp.compile(
        hasProtocol
          ? splittedUrl.slice(2, splittedUrl.length).join(PATH_SEP)
          : splittedUrl.join(PATH_SEP)
      )
    };
  }

  _doRequest(requestOptions, isAuthRetry) {
    const retry = () => {
      this._doBeforeRequest();
      return this._doRequest(
        {
          ...requestOptions,
          headers: this._headers
        },
        true
      );
    };

    return this.client(requestOptions)
      .then(response => (this._fullResponse ? response : response.data))
      .catch(error => {
        if (
          !isAuthRetry &&
          this._authErrorHandler &&
          error.response &&
          error.response.status === this._authErrorStatus
        ) {
          return this._authErrorHandler(this, retry);
        }
        return this._errorHandler(error);
      });
  }

  _doBeforeRequest() {
    if (this._onBeforeRequest) {
      this._onBeforeRequest(this);
    }
    if (this._onceBeforeRequest) {
      this._onceBeforeRequest(this);
    }
  }

  _readRequest(url) {
    return this._doRequest({
      url,
      validateStatus: this._validateStatus,
      method: this._readMethod,
      headers: this._headers
    });
  }

  _updateRequest(url, data) {
    return this._doRequest({
      url,
      data,
      validateStatus: this._validateStatus,
      method: this._updateMethod,
      headers: this._headers
    });
  }

  _createRequest(url, data) {
    return this._doRequest({
      url,
      data,
      validateStatus: this._validateStatus,
      method: this._createMethod,
      headers: this._headers
    });
  }

  _deleteRequest(url) {
    return this._doRequest({
      url,
      validateStatus: this._validateStatus,
      method: this._deleteMethod,
      headers: this._headers
    });
  }

  _readFromCache(filter, url) {
    const cached = this._cache.get(filter);
    if (cached) {
      return cached;
    }
    const request = this._readRequest(url).catch(err => {
      this._cache.set(filter, null);
      return Promise.reject(err);
    });
    this._cache.set(filter, request);
    return request;
  }

  _read(filter) {
    this._doBeforeRequest();
    const url = this._getUrl(filter);
    if (this._useCache) {
      return this._readFromCache(filter, url);
    }
    return this._readRequest(url);
  }

  _cleanAfterRequest(request, filter) {
    return request.then(responseData => {
      this._clean(filter);
      // If optimistic, the cache can be updated here directly, so consequents "reads" to same url will not be sent to the server, but returned from last "update"
      return Promise.resolve(responseData);
    });
  }

  _update(filter, data) {
    this._doBeforeRequest();
    return this._cleanAfterRequest(this._updateRequest(this._getUrl(filter), data), filter);
  }

  _create(filter, data) {
    this._doBeforeRequest();
    return this._cleanAfterRequest(this._createRequest(this._getUrl(filter), data));
  }

  _delete(filter) {
    this._doBeforeRequest();
    return this._cleanAfterRequest(this._deleteRequest(this._getUrl(filter)), filter);
  }

  setHeaders(headers) {
    this._headers = headers;
  }

  addHeaders(headers) {
    this._headers = {
      ...this._headers,
      ...headers
    };
  }
}
