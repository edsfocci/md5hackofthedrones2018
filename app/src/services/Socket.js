import io from 'socket.io-client';

export class SocketService {
  constructor() {
    this.socket = null;
  }

  connected() {
    return this.socket && this.socket.connected;
  }

  connect(url) {
    if(!this.socket) {
      this.socket = io(url);
    }
  }

  close() {
    if(this.socket) {
      this.socket.close();
    }
  }

  addListener(tag, callback) {
    this.socket.on(tag, callback);
  }

  removeListener(tag) {
    this.socket.off(tag);
  }

}
