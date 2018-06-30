var mongoose = require('mongoose');
var cardCategorySchema =new  mongoose.Schema({   
    name        :{
        type    :   String,
        required:   true
    }, 
    description       :   String,                 
});

module.exports = mongoose.model('cardcategory', cardCategorySchema);