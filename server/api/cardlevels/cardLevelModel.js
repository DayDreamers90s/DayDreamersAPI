var mongoose = require('mongoose');
var cardLevelSchema =new  mongoose.Schema({   
    code        :{
        type    :   String,
        required:   true
    },
    canHaveCategories:{
        type    :   Boolean,
        default :   false,
        required:   true
    }, 
    canHaveImages   :{
        type    :   Boolean,
        default :   false,
        required:   true
    }              
});

module.exports = mongoose.model('cardlevel', cardLevelSchema);