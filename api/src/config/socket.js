const socketIo = require("socket.io");
const app = require("../app");
const http = require("http");

const server = http.createServer(app);
const io = socketIo(server);

module.exports = io;
