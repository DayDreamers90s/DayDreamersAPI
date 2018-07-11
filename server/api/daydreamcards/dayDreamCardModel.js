var mongoose = require('mongoose');
var dayDreamCardSchema = new mongoose.Schema({   
    name        :{
        type    :   String,
        required:   true
    }, 
    description       :   String, 
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'imageModel'},
    cardcategory: [{type: mongoose.Schema.Types.ObjectId, ref: 'cardcategory'}],    
    cardlevel : {type: mongoose.Schema.Types.ObjectId, ref: 'cardlevel'}         
});

module.exports = mongoose.model('daydreamcard', dayDreamCardSchema);