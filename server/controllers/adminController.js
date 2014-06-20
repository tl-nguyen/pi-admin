var mongoose = require('mongoose'),
    passport = require('passport');

var Admin = mongoose.model('Admin');

exports.signUp = function (req, res, next) {
    Admin.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            var admin = new Admin();

            admin.username = req.body.username;
            admin.salt = admin.createSalt();
            admin.hashed_pwd = admin.hashPwd(admin.salt, req.body.password);
            admin.save();

            req.logIn(admin, function (err) {
                if(err) {return next(err);}
            });
        }
        res.redirect('/');
    });
};

exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if(err) {
            return next(err);
        }

        if(!user) {
            res.send('Wrong password or username');
        }

        req.logIn(user, function (err) {
            if(err) {return next(err);}
            res.redirect('/');
        });
    });
    auth(req, res, next);
};