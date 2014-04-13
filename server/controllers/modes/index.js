var status = require('./status.js');
var basicMode = require('./basic.js');
var godMode = require('./god.js');

exports.dataHandle = function (socket) {
    status.init(socket);
    basicMode.init(socket);
    godMode.init(socket);
};