var mongoose = require('mongoose');
var dreamCommentsSchema =  new  mongoose.Schema({
   
    user        : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    daydream   : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captureddream',
        required: true
    },
    comment :{
        type:   String,
        required: true
    }

});

module.exports = mongoose.model('dreamcomment', dreamCommentsSchema);