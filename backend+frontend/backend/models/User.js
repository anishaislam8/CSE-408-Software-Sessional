const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { ObjectID } = require('mongodb');

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
        minlength : 10,
        maxlength : 10,
        required : true,
        trim : true
    },
    physical_connection_establishment_time : {
        type : Date,
        default : null
    },
    connection_establishment_date: {
        type: Date,
        default: null
    },
    expiration_date : {
        type : Date,
        default : null
    },
    connection_status : {
        type : Boolean,
        default : false
    },
    physical_connection_details : [{
        connection_id : {
            type : ObjectID,
            default : null,
            required : true
        }
    }],
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


UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
        
    } else {
        next();
    }
})
var User = mongoose.model('User', UserSchema);


module.exports = {User};