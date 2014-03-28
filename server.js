/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

// controller
var controller = require("./server/controllers/index.js");

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/server/views/index.html');
});


io.sockets.on('connection', controller.dataHandle);

server.listen(app.get('port'));