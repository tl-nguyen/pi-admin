'use strict';

var express = require('express'),
    swig = require('swig'),
    passport = require('passport');

module.exports = function (app, config) {
    // all environments
    app.engine('html', swig.renderFile);
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'html');
    app.use(express.cookieParser());
    app.use(express.urlencoded());
    app.use(express.session({secret: 'pi admin heroes'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(config.rootPath + '/public'));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

};