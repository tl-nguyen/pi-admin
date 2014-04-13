var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/pi-admin',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://<username:<password>@oceanic.mongohq.com:10052/pi-admin',
        port: process.env.PORT || 8000
    }
};