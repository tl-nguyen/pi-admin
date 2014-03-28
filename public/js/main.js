$(document).ready(function () {
    var socket = io.connect('http://localhost');

    // === Data Gauges
    var tempGage = new JustGage({
        id: "currentTemp",
        value: 0,
        min: 0,
        max: 100,
        title: "Temperature",
        titleFontColor: "#575757",
        label: "°C",
        labelFontColor: "black",
        levelColorsGradient: false,
        gaugeWidthScale: 0.5
    });

    var cpuGage = new JustGage({
        id: "cpuUsage",
        value: 0,
        min: 0,
        max: 100,
        title: "CPU Usage",
        titleFontColor: "#575757",
        label: "%",
        labelFontColor: "black"
    });

    var memoryGage = new JustGage({
        id: "memoryUsage",
        value: 0,
        min: 0,
        max: 100,
        title: "Memory Usage",
        titleFontColor: "#575757",
        label: "%",
        labelFontColor: "black"
    });
    // ===

    // Recieve Hostname data
    socket.on('hostname', function (hostname) {
        $('#hostname').text(hostname);
    });

    // Recieve Temperature data
    socket.on('temperature', function (temperature, minTemp, maxTemp) {
        if (temperature < minTemp) minTemp = temperature;
        if (temperature > maxTemp) maxTemp = temperature;

        tempGage.refresh(temperature);

        $('#minTemp').text(minTemp + " °C");
        $('#maxTemp').text(maxTemp + " °C");
    });

    // Recieve CPU Usage data
    socket.on('cpuUsage', function (cpuUsage) {
        cpuGage.refresh(cpuUsage);
    });

    // Recieve Total Memory
    socket.on('memoryTotal', function (memoryTotal) {
        $('#memTotal').text(memoryTotal + " MB");
    });

    // Recieve Memory Usage data
    socket.on('memoryUsage', function (memoryUsage, memUsed, memFree) {
        memoryGage.refresh(memoryUsage);
        $('#memUsed').text(memUsed + " MB");
        $('#memFree').text(memFree + " MB");
    });

    // Recieve Local Time and Uptime
    socket.on('timeData', function (timeData) {
        $('#timeData').text(timeData);
    })

    // Recieve Top List
    socket.on('topList', function (topList) {
        $('#top-list tbody').text("");
        var topListArray = topList.split(';');

        // Render a top list table
        for (var i = 7; i < topListArray.length - 1; i++) {
            var listEls = topListArray[i].split(" ");

            $('#top-list tbody').append(
                "<tr>" +
                "<td>" + listEls[0] + "</td>" +
                "<td>" + listEls[1] + "</td>" +
                "<td>" + listEls[2] + "</td>" +
                "<td>" + listEls[3] + "</td>" +
                "</tr>"
            );
        }
    })

    // Recieve Storage Info
    socket.on('storageInfo', function (storageInfo) {
        $('#storage-info tbody').text("");
        var storageInfoArray = storageInfo.split(';');

        // Render a storage info table
        for (var i = 1; i < storageInfoArray.length - 1; i++) {
            var listEls = storageInfoArray[i].split(" ");

            $('#storage-info').append(
                "<tr>" +
                "<td>" + listEls[0] + "</td>" +
                "<td>" + listEls[1] + "</td>" +
                "<td>" + listEls[2] + "</td>" +
                "<td>" + listEls[3] + "</td>" +
                "<td>" + listEls[4] + "</td>" +
                "<td>" + listEls[5] + "</td>" +
                "</tr>"
            );
        }
    });

    // Emit Reboot command
    $('#reboot').on('click', function () {
        $('.btn-danger').attr("disabled", "disabled");
        $('.alert-reboot').show(300);
        socket.emit('reboot');
    });

    // Emit shutdown command
    $('#shutdown').on('click', function () {
        $('.btn-danger').attr("disabled", "disabled");
        $('.alert-shutdown').show(300);
        socket.emit('shutdown');
    });

    // Emit kill command
    $('#kill-button').on('click', function () {
        var procName = $('#kill-field').val();
        socket.emit('kill', procName);
    });

    // Emit path to peek
    $('#peek-button').on('click', function () {
        var path = $('#peek-field').val();
        socket.emit('peek', path);

    });

    // Receive peek result from requests
    socket.on('peek-result', function (result) {
        $("#peek-result .modal-body").text("");
        var resultToArray = result.split("\n");

        for (var i = 0; i < resultToArray.length; i++) {
            $("#peek-result .modal-body").append("<p>" + resultToArray[i] + "</p>");
        }
    });

    // Emit command
    $('#run-command').on('click', function () {
        var command = $('#command-line').val();
        socket.emit('command', command);
    });

    // Receive command result
    socket.on('command-result', function (result) {
        $('#command-result .panel-body').text("");
        console.log(result);
        var resultToArray = result.split("\n");

        for (var i = 0; i < resultToArray.length; i++) {
            $("#command-result .panel-body").append("<p>" + resultToArray[i] + "</p>");
        }
    });

    // App buttons and links behaviours
    // ===
    $('.show-common-data').on('click', function () {
        $(".common-data").show();
    });

    $('.hide-common-data').on('click', function () {
        $(".common-data").hide();
    });
    // ===

    // Copyright year
    $("#recent-year").text((new Date()).getFullYear());
})