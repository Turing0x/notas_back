require('dotenv').config();

const Server = require('./api/models/server');
const server = new Server();

server.listen();