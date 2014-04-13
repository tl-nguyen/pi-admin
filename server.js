var express = require('express'),
    http = require('http');

// controller
var controller = require("./server/controllers/modes/index.js");

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config') [env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

io.sockets.on('connection', controller.dataHandle);

server.listen(config.port);
console.log('Listening on port ' + config.port);