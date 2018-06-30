var mongoose = require('mongoose');
var dreamlikesSchema =new  mongoose.Schema({
   
    user        : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    daydream   : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captureddream',
        required: true
    }
});

module.exports = mongoose.model('dreamlike', dreamlikesSchema);