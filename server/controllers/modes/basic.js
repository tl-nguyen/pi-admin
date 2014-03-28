var exec = require('child_process').exec;

exports.init = function (socket) {

    // Receive Reboot request
    var receiveReboot = function () {
        socket.on('reboot', function () {
            exec("sudo reboot", function (err, stdout, stderr) {
                if (err !== null) {
                    console.log('exec error: ' + err);
                }
            });
        });
    };

    // Receive Shutdown request
    var receiveShutdown = function () {
        socket.on('shutdown', function () {
            exec("sudo shutdown -h", function (err, stdout, stderr) {
                if (err !== null) {
                    console.log('exec error: ' + err);
                }
            });
        });
    };

    // Receive Process Name to Kill
    var receiveKillProccess = function () {
        socket.on('kill', function (procName) {
            exec("sudo pkill " + procName, function (err, stdout, stderr) {
                if (err !== null) {
                    console.log('exec error: ' + err);
                }
            });
        });
    };

    // Receive Path to Peek
    var receivePathToPeek = function () {
        socket.on('peek', function (path) {
            exec("sudo ls " + path + " -l", function (err, stdout, stderr) {
                if (err !== null) {
                    console.log('exec error: ' + err);
                    socket.emit('peek-result', stderr);
                } else {
                    socket.emit('peek-result', stdout);
                }
            });
        });
    };

    var initialize = function () {
        //Receive requests from the web
        receiveReboot();
        receiveShutdown();
        receiveKillProccess();
        receivePathToPeek();
    };

    // Starting point ;-)
    initialize();

}