const mongoose = require('mongoose');


var UserSchema  = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minlength : 1,
        trim : true,
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    nid : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    connection_establishment_date: {
        type: Number,
        default: moment().valueOf()
    },
    connection_status : {
        type : Boolean,
        default : false
    },
    payment_status : {
        type : Boolean,
        default : false
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
})