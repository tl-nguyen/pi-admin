'use strict';

var middlewares = require('./middlewares'),
    adminController = require('../controllers/adminController');

module.exports = function (app) {
    app.get('/', middlewares.requiresLogin, function (req, res) {
        res.render('index');
    });

    app.get('/signup', middlewares.existsAlready, function (req, res) {
        res.render('signup');
    });

    app.post('/signup', adminController.signUp);

    app.get('/login', middlewares.requiresSignUp, function (req, res) {
        res.render('login');
    });

    app.post('/login', adminController.authenticate);
};