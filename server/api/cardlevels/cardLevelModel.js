var mongoose = require('mongoose');
var cardLevelSchema =new  mongoose.Schema({   
    code        :{
        type    :   String,
        required:   true
    },                 
});

module.exports = mongoose.model('cardlevel', cardLevelSchema);