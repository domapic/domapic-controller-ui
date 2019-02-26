import { debounce } from "lodash";
import { authSession } from "./users";

const DEBOUNCE_TIME = 500;

class Socket {
  constructor() {
    this._socket = null;
    this._listeners = [];
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
    this._doJwtLogin = debounce(this._doJwtLogin.bind(this), DEBOUNCE_TIME);
    this._doApiKeyLogin = debounce(this._doApiKeyLogin.bind(this), DEBOUNCE_TIME);
    this._doLogout = debounce(this._doLogout.bind(this), DEBOUNCE_TIME);
    this._getCurrentAuth = debounce(this._getCurrentAuth.bind(this), DEBOUNCE_TIME);
  }

  _handleDataSources() {
    this._listeners.forEach(listener => {
      this._socket.on(listener.eventName, listener.callback);
    });
    /* 
    this._socket.on("service:created", data => {
      servicesCollection.type(data.type).clean();
    });
    */
  }

  _doJwtLogin() {
    console.log("doing jwt login");
  }

  _doApiKeyLogin() {
    console.log("doing api key login");
  }

  _doLogout() {
    console.log("doing logout");
  }

  _getCurrentAuth() {
    return Promise.all([this._refreshToken.read(), this._apiKey.read()]).then(results => {
      console.log("New refresh token value", results[0]);
      console.log("New api key value", results[1]);
      if (results[0]) {
        return this._doJwtLogin();
      }
      if (results[1]) {
        return this._doApiKeyLogin();
      }
      return this._doLogout();
    });
  }

  _addAuthListeners() {
    this._refreshToken.onChange(this._getCurrentAuth);
    this._apiKey.onChange(this._getCurrentAuth);
  }

  // DataSources will add their listeners using this method
  addListener(eventName, callback) {
    this._listeners.push({
      eventName,
      callback
    });
  }

  setup(url) {
    this._socket = window && window.io && window.io(url);
    if (this._socket) {
      this._handleDataSources();
      this._addAuthListeners();
    } else {
      console.error("Sockets are not available");
    }
  }
}

export const socket = new Socket();
