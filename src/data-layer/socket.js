import { debounce } from "lodash";
import { authSession } from "./users";

const DEBOUNCE_TIME = 500;
const AUTH_METHODS = {
  JWT: "jwt",
  API_KEY: "apiKey"
};

class Socket {
  constructor() {
    this._socket = null;
    this._listeners = [];
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
    this._doJwtLogin = debounce(this._doLogin.bind(this), DEBOUNCE_TIME);
    this._doLogout = debounce(this._doLogout.bind(this), DEBOUNCE_TIME);
    this._getCurrentAuth = debounce(this._getCurrentAuth.bind(this), DEBOUNCE_TIME);

    this._currentToken = null;
    this._currentAuthMethod = null;
  }

  _handleDataSources() {
    this._listeners.forEach(listener => {
      console.log("Adding listener", listener.eventName);
      this._socket.on(listener.eventName, listener.callback);
    });
  }

  _doLogin(refreshToken) {
    if (this._currentToken !== refreshToken) {
      if (this._socket.connected) {
        this._socket.close();
      }
      this._currentToken = refreshToken;
      console.log("Connecting socket");
      this._socket.connect();
    }
  }

  _doLogout() {
    this._currentToken = null;
    this._currentAuthMethod = null;
    this._socket.close();
  }

  _getCurrentAuth() {
    return Promise.all([this._refreshToken.read(), this._apiKey.read()]).then(results => {
      if (results[0]) {
        this._currentAuthMethod = AUTH_METHODS.JWT;
        return this._doLogin(results[0]);
      }
      if (results[1]) {
        this._currentAuthMethod = AUTH_METHODS.API_KEY;
        return this._doLogin(results[1]);
      }
      return this._doLogout();
    });
  }

  _addAuthListeners() {
    this._refreshToken.onChange(this._getCurrentAuth);
    this._apiKey.onChange(this._getCurrentAuth);
    this._socket.on("authenticated", () => {
      console.log("Socket authenticated");
    });
    this._socket.on("unauthorized", error => {
      console.log("Error in socket authentication:", error.message);
    });
    this._socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    this._socket.on("error", error => {
      console.log("Socket error");
      console.log(error);
    });
    this._socket.on("connect", () => {
      console.log("Socket connected");
      if (this._currentToken) {
        console.log("Emitting authentication");
        this._socket.emit("authentication", {
          [this._currentAuthMethod]: this._currentToken
        });
      }
    });
  }

  // DataSources will add their listeners using this method
  addListener(eventName, callback) {
    this._listeners.push({
      eventName,
      callback
    });
  }

  setup(url) {
    const script = document.createElement("script");
    script.type = "text/javascript"
    script.onload = () => {
      this._socket = window && window.io && window.io(url);
      if (this._socket) {
        this._handleDataSources();
        this._addAuthListeners();
        this._getCurrentAuth();
      } else {
        console.error("Sockets are not available");
      }
    }
    script.src = `${url}/socket.io/socket.io.js`;
    document.head.appendChild(script);
  }
}

export const socket = new Socket();
