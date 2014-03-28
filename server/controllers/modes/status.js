var exec = require('child_process').exec;

exports.init = function (socket) {

    // Data Store
    var memTotal = 0,
        minTemp = 1000,
        maxTemp = 0;

    // Emit Hostname
    var emitHostName = function () {
        exec("hostname", function (err, stdout, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                socket.emit('hostname', stdout);
            }
        });
    };

    // Emit Temperature
    var emitTemperature = function () {
        exec("cat /sys/class/thermal/thermal_zone0/temp", function (err, stdout, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                var temperature = (stdout / 1000).toPrecision(3);

                if (temperature < minTemp) minTemp = temperature;
                if (temperature > maxTemp) maxTemp = temperature;

                socket.emit('temperature', temperature, minTemp, maxTemp);
            }
        });
    };

    // Emit CPU Usage
    var emitCPUUsage = function () {
        exec("top -d 0.5 -b -n2 | grep 'Cpu(s)'|tail -n 1 | awk '{print $2 + $4}'", function (err, stdout, stderr) {
            if (err !== null) {
                console.log('exec error: ' + err);
            } else {
                socket.emit('cpuUsage', stdout);
            }
        });
    };

    // Emit Memory Usage
    var emitMemoryUsage = function () {
        exec("grep 'MemFree' /proc/meminfo | grep -E '[0-9.]{4,}' -o", function (err, memFree, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                var memUsed = memTotal - memFree;
                var memUsedToPercent = memUsedToPercent = Math.round(memUsed * 100 / memTotal);
                socket.emit('memoryUsage', memUsedToPercent, (memUsed / 1024).toPrecision(6), (memFree / 1024).toPrecision(6));
            }
        });
    };

    // Emit Memory Total
    var emitMemoryTotal = function () {
        exec("grep 'MemTotal' /proc/meminfo | grep -E '[0-9.]{4,}' -o", function (err, stdout, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                memTotal = stdout;
                socket.emit('memoryTotal', (memTotal / 1024).toPrecision(6));
                //Emit the memory usage for the first time 
                //after getting the total memory - synchronous hack :-D
                emitMemoryUsage();
            }
        });
    };

    // Emit Local time and Up time
    var emitTime = function () {
        exec("uptime | tail -n 1 | awk '{print $1 \" \" $2 \" \" $3 \" \" $4}'", function (err, stdout, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                socket.emit('timeData', (stdout.split(","))[0]);
            }
        });
    }

    // Emit Top List
    var emitTopList = function () {
        exec(" top -d 0.1 -b -n 2 | head -23 | awk '{print $1 \" \" $9 \"% \" $10 \"% \" $12 \" ;\"}'",
            function (err, stdout, stderr) {
                if (err != null) {
                    console.log('exec error: ' + err);
                } else {
                    socket.emit('topList', stdout);
                }
            });
    }

    // Emit Storage info
    var emitStorageInfo = function () {
        exec("df -h | awk '{print $1 \" \" $2 \" \" $3 \" \" $4 \" \" $5 \" \" $6 \";\"}'", function (err, stdout, stderr) {
            if (err != null) {
                console.log('exec error: ' + err);
            } else {
                socket.emit('storageInfo', stdout);
            }
        });
    }

    var initialize = function () {
        //Emit data to the web
        emitHostName();
        emitTemperature();
        emitCPUUsage();
        emitMemoryTotal();
        emitTime();
        emitTopList();
        emitStorageInfo();

        // Setting emit intervals for different data
        setInterval(emitTemperature, 10000);
        setInterval(emitCPUUsage, 5000);
        setInterval(emitMemoryUsage, 5000);
        setInterval(emitTime, 1000);
        setInterval(emitTopList, 5000);
        setInterval(emitStorageInfo, 60000);
    }

    // Starting point ;-)
    initialize();

};