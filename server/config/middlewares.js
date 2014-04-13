var mongoose = require('mongoose');

var Admin = mongoose.model('Admin');

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

exports.requiresSignUp = function(req, res, next) {
    Admin.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            res.render('signup');
        } else {
            next();
        }
    });
}

exports.existsAlready = function(req, res, next) {
    Admin.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            next();
        } else {
            res.send(401);
        }
    });
}