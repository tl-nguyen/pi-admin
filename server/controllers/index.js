var status = require('./modes/status.js');
var basicMode = require('./modes/basic.js');
var godMode = require('./modes/god.js');

exports.dataHandle = function (socket) {
    status.init(socket);
    basicMode.init(socket);
    godMode.init(socket);
};