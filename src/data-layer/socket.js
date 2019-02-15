import { servicesCollection } from "./services";

class Socket {
  _handleDataSources() {
    // TODO, setup only received dataSources
    this._socket.on("service:created", data => {
      servicesCollection.type(data.type).clean();
    });
  }

  setup(/*url*/) {
    //this._socket = window && window.io && window.io(url);
    if (this._socket) {
      this._handleDataSources();
    } else {
      console.error("Sockets are not available");
    }
  }
}

export const socket = new Socket();
