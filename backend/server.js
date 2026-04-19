require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { initSocket } = require('./src/sockets/socket');

const server = http.createServer(app);
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});