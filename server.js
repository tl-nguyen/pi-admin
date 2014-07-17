'use strict';

var express = require('express'),
    http = require('http'),
    controller = require("./server/controllers/modes/index.js"),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config') [env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

io.sockets.on('connection', controller.dataHandle);

server.listen(config.port);
console.log('Listening on port ' + config.port);