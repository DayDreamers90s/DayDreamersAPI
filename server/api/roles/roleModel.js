var mongoose = require('mongoose');
var rolesSchema = new mongoose.Schema({   
    name        :{
        type    :   String,
        unique  :   true,
        required:   true
    }, 
    description       :   String,
    permissions        : [{type: mongoose.Schema.Types.ObjectId, ref: 'permission'}]                  
});

module.exports = mongoose.model('role', rolesSchema);