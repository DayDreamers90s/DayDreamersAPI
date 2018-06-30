var mongoose = require('mongoose');
var capturedDreamsSchema =new  mongoose.Schema({   
    name        :{
        type    :   String,
        required:   true
    }, 
    title        :{
        type    :   String,
        required:   true
    }, 
    description       :   String, 
    image: { data: Buffer, contentType: String }           
});

module.exports = mongoose.model('captureddream', capturedDreamsSchema);