var mongoose = require('mongoose');
var UserDetailsSchema = new  mongoose.Schema({
    user                     : {type: mongoose.Schema.Types.ObjectId, ref: 'user', unique:true},
    firstname                : String,
    lastname                 : String,
    birthdate                : Date,
    phonenumber              : Number,
    roles                    :[{type: mongoose.Schema.Types.ObjectId, ref:'role' }]  ,
    address                  : {type: mongoose.Schema.Types.ObjectId, ref: 'address'},      
    capturedDreams        : [{type: mongoose.Schema.Types.ObjectId, ref: 'captureddream'}]    
});

module.exports = mongoose.model('userdetail', UserDetailsSchema);