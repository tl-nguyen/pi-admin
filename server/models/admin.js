var mongoose = require('mongoose'),
    crypto = require('crypto');

var adminSchema = mongoose.Schema({
    username: String,
    salt: String,
    hashed_pwd: String
});

adminSchema.methods = {
    authenticate: function (passwordToMatch) {
        return this.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    createSalt: function () {
        return crypto.randomBytes(128).toString('base64');
    },
    hashPwd: function (salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return  hmac.update(pwd).digest('hex');
    }
};

mongoose.model('Admin', adminSchema);