var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

    local     : {     
            email     : String,
            password     : String 
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    instagram          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('user', UserSchema);
