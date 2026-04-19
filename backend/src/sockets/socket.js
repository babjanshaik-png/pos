const { Server } = require('socket.io');

let io;

exports.initSocket = (server) => {
  io = new Server(server, { cors: { origin: '*' } });
};

exports.getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};