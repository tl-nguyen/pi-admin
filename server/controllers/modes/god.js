var exec = require('child_process').exec;

exports.init = function (socket) {

    // Receive Command
    var receiveCommand = function () {
        socket.on('command', function (command) {
            console.log(command);
            exec(command, function (err, stdout, stderr) {
                if (err !== null) {
                    console.log('exec error: ' + err);
                    socket.emit('command-result', stderr);
                } else {
                    socket.emit('command-result', stdout);
                }
            });
        });
    };

    (function () {
        //Receive requests from the web
        receiveCommand();
    }());

};