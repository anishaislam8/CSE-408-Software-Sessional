const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var PendingSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    license_id : {
        type : String,
        default : null
    },
    nid : {
        type : String,
        default : null
    },
    area_id : {
        type : ObjectID,
        default : null
    },
    union_id : {
        type : Number,
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
        type : Number,
        default : moment().valueOf(),
        required : true
    }
});

var Pending = mongoose.model('Pending', PendingSchema);

module.exports = {Pending};