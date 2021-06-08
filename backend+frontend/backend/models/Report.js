const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const moment = require('moment');

var ReportSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
    isp_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    union_id : {
        type : String,
        default : null
    },
    area_id : {
        type : ObjectID,
        default : null
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    category: { //0 - Low Bandwidth, 1 - Physical Connection problem, 2 - Platform related Problem, 3 - Others
        type : String,
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
        type : Date,
        default : new Date()
    },
    report_resolve_time : {
        type : Date,
        default : null
    }
});

var Report = mongoose.model('Report', ReportSchema);

module.exports = {Report};