var mongoose = require('mongoose');
var permissionsSchema = new mongoose.Schema({
   
    name        :{
        type    :   String,
        required:   true,
        unique:     true
    }, 
    description       :   String,
    page        :{
        type    :   String,
        required:   true
    }        
});

module.exports = mongoose.model('permission', permissionsSchema);