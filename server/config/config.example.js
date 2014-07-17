'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://your-database-address',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://your-database-address',
        port: process.env.PORT || 8000
    }
};