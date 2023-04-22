const {Server} = require('socket.io');

let io;

module.exports = {
  init: (server) => {
    io = new Server(server,{
        cors:{
          origin:"http://localhost:3000"
        }
      });

    io.on('connection', (socket) => {
      console.log('New client connected');

      // Handle incoming events from clients
      socket.on('event', (data) => {
        console.log('Received data:', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  },
};
