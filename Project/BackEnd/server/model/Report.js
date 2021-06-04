const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var ReportSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
    isp_id : {
        type : ObjectID,
        default : null
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    category: {
        type : Number,
        required : true,
    },
    details: {
        type : String,
        trim : true,
        minlength : 1,
    },
    resolve_status : {
        type : Boolean,
        default : false
    },
    report_arrival_time : {
        type : Number,
        default : moment().valueOf()
    }
});

var Report = mongoose.model('Report', ReportSchema);

module.exports = {Report};