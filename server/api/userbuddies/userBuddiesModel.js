var mongoose = require('mongoose');
var UserBuddiesSchema = new mongoose.Schema({

    user        : {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    name        :{
        type    :   String,
        required:   true
    }, 
    email       :  { 
        type    :   String,
        unique  :   true
    }                  
});

module.exports = mongoose.model('userbuddy', UserBuddiesSchema);