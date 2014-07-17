'use strict';

var status = require('./status.js'),
    basicMode = require('./basic.js'),
    godMode = require('./god.js');

exports.dataHandle = function (socket) {
    var statusAPI = status.init(socket),
        basicAPI = basicMode.init(socket),
        godAPI = godMode.init(socket);

    //Emit data to the web from status
    statusAPI.emitHostName();
    statusAPI.emitTemperature();
    statusAPI.emitCPUUsage();
    statusAPI.emitMemoryTotal();
    statusAPI.emitTime();
    statusAPI.emitTopList();
    statusAPI.emitStorageInfo();
    // Setting emit intervals for different data
    setInterval(statusAPI.emitTemperature, 15000);
    setInterval(statusAPI.emitCPUUsage, 10000);
    setInterval(statusAPI.emitMemoryUsage, 10000);
    setInterval(statusAPI.emitTime, 1000);
    setInterval(statusAPI.emitTopList, 10000);
    //setInterval(statusAPI.emitStorageInfo, 60000);

    //Receive requests from the web from basic mode
    basicAPI.receiveReboot();
    basicAPI.receiveShutdown();
    basicAPI.receiveKillProcess();
    basicAPI.receivePathToPeek();


    //Receive requests from the web from god mode
    godAPI.receiveCommand();
};