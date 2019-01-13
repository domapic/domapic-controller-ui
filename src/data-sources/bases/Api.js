import { DataSource } from "./bases/DataSource";

import pathToRegexp from "path-to-regexp";

import axios from "axios";

const PATH_SEP = "/";

const validateStatus = status => status >= 200 && status < 300;

const defaultMethods = {
  read: true
};

const defaultConfig = {
  readMethod: "get",
  updateMethod: "patch",
  createMethod: "post",
  deleteMethod: "delete",
  cache: true
};

export class Api extends DataSource {
  constructor(url, methods = {}, config = {}) {
    const configuration = { ...defaultConfig, ...config };
    super({ ...defaultMethods, ...methods }, configuration);

    this.readMethod = configuration.readMethod;
    this.updateMethod = configuration.updateMethod;
    this.createMethod = configuration.createMethod;
    this.deleteMethod = configuration.deleteMethod;
    // TODO, optimistic?
    this._setUrl(url);
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
    return `${this.url.base}/${this.url.segment(filter.params)}${this._getQueryString(
      filter.query
    )}`;
  }

  _setUrl(baseUrl) {
    const splittedUrl = baseUrl.split(PATH_SEP);

    this.url = {
      base: `${splittedUrl[0]}//${splittedUrl[2]}`,
      segment: pathToRegexp.compile(splittedUrl.slice(3, splittedUrl.length).join(PATH_SEP))
    };
  }

  async _doRequest(requestOptions) {
    return axios(requestOptions)
      .then(response => response.data)
      .catch(error => {
        // TODO, Configurable error handler
        const errorMessage =
          (error.response && error.response.statusText) || error.message || "Request error";
        return Promise.reject(new Error(errorMessage));
      });
  }

  async _readRequest(url) {
    console.log("READ request", url);
    return this._doRequest({
      method: this.readMethod,
      url
    });
  }

  async _updateRequest(url, data) {
    console.log("UPDATE request", url);
    return this._doRequest({
      method: this.updateMethod,
      url,
      data,
      validateStatus
    });
  }

  async _createRequest(url, data) {
    console.log("CREATE request", url);
    return this._doRequest({
      method: this.createMethod,
      url,
      data,
      validateStatus
    });
  }

  async _deleteRequest(url) {
    console.log("DELETE request", url);
    return this._doRequest({
      method: this.deleteMethod,
      url,
      validateStatus
    });
  }

  async _readFromCache(filter, url) {
    const cached = this._cache.get(filter);
    if (cached) {
      console.log("Returning api from cache", filter);
      return cached.request;
    }
    console.log("Loading api from axios");
    const request = this._readRequest(url);
    this._cache.set(filter, { request });
    return request;
  }

  async _read(filter) {
    const url = this._getUrl(filter);
    if (this._cache) {
      return this._readFromCache(filter, url);
    }
    return this._readRequest(url);
  }

  async _cleanAfterRequest(request, filter) {
    return request.then(responseData => {
      this._clean(filter);
      // If optimistic, the cache can be updated here directly, so consequents "reads" to same url will not be sent to the server, but returned from last "update"
      // this._cache.set(filter, { request: Promise.resolve(data) });
      return Promise.resolve(responseData);
    });
  }

  async _update(filter, data) {
    return this._cleanAfterRequest(this._updateRequest(this._getUrl(filter), data), filter);
  }

  async _create(filter, data) {
    return this._cleanAfterRequest(this._createRequest(this._getUrl(), data));
  }

  async _delete(filter) {
    return this._cleanAfterRequest(this._deleteRequest(this._getUrl(filter)), filter);
  }
}
