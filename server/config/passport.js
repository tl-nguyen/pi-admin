'use strict';

require('../models/admin');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');


module.exports = function () {
    var Admin = mongoose.model('Admin');

    passport.use(new LocalStrategy(
        function (username, password, done) {
            Admin.findOne({username: username}).exec(function (err, user) {
                if(user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        if(user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser(function (id, done) {
        Admin.findOne({_id: id}).exec(function (err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};