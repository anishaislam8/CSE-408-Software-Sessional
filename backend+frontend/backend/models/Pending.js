const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const moment = require('moment');

var PendingSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
    isp_id : {
        type : ObjectID,
        required : true,
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    area_id : {
        type : ObjectID,
        default : null
    },
    union_id : {
        type : String,
        default : null
    },
    package_id : {
        type : ObjectID,
        required : true
    },
    status : {
        type : Boolean,
        default : false
    },
    request_arrival_time : {
        type : Date,
        default : new Date()
    },
    request_accept_time : {
        type : Date,
        default : null
    },
    payment_id : {
        type : ObjectID,
        default : null
    }
});

var Pending = mongoose.model('Pending', PendingSchema);

module.exports = {Pending};