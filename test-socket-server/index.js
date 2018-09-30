const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mockData = require('./mock-data');

io.on('connection', function(socket){
  console.log('a user connected');
  emitMockData(socket);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function emitMockData(socket) {
  let currentIndex = 0;
  const mockStream = setInterval(
    () => mockMessage(),
    100
  );

  function mockMessage() {
    let newIndex = currentIndex + 1;
    if (newIndex === mockData.length) {
      clearInterval(mockStream);
    } else {
      const message = mockData[newIndex];
      message.ttl = new Date().getTime();
      currentIndex = newIndex;
      socket.emit('drone_data', message);
    }
  }
}