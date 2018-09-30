var io = require('socket.io')(http);

export class DataSocket {
  constructor() {
    // Empty
  }

  connect(url) {
    window.socket = io(url);
  }

  close() {
    window.socket.close();
  }

  addListener(tag, callback) {
    window.socket.on(tag, callback);
  }

  removeListener(tag) {
    window.socket.off(tag);
  }

}
