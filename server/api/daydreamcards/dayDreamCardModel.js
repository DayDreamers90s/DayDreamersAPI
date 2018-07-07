var mongoose = require('mongoose');
var dayDreamCardSchema = new mongoose.Schema({   
    name        :{
        type    :   String,
        required:   true
    }, 
    description       :   String, 
    image: { data: Buffer, contentType: String },
    cardcategory: [{type: mongoose.Schema.Types.ObjectId, ref: 'cardcategory'}],    
    cardlevel : {type: mongoose.Schema.Types.ObjectId, ref: 'cardlevel'}         
});

module.exports = mongoose.model('daydreamcard', dayDreamCardSchema);