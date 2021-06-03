const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var ISPSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minlength : 1,
        trim : true,
    },
    password : {
        type : String,
        minlength : 6,
        require : true
    },
    license_id : {
        type : String,
        minlength : 6,
        require : true
    },
    connection_establishment_date: {
        type: Number,
        required: true,
        default: null
    },
    expiration_date: {
        type: Number,
        required: true,
        default: null
    },
    connection_status : {
        type : Boolean,
        required : true,
        default : false
    },
    payment_status : {
        type : Boolean,
        required : true,
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

ISPSchema.pre('save', function(next) {
    var isp = this;

    if(isp.isModified('password')){
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(isp.password, salt, (err, hash) => {
                isp.password = hash;
                next();
            })
        })
        
    } else {
        next();
    }
})
var ISP = mongoose.model('ISP', ISPSchema);


module.exports = {ISP};