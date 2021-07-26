const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const {ObjectID} = require('mongodb');


var UserConnectionSchema = new mongoose.Schema({
    user_name : {
        required : true,
        type : String,
        minlength : 1,
        trim : true,
    },
    nid_number : {
        type : String,
        minlength : 10,
        maxlength:10,
        required : true,
        trim : true
    },
    contact_person_address : {
        type : String,
        minlength : 1,
        maxlength : 255,
        trim : true,
        default: null
    },
    contact_person_telephone : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    contact_person_mobile : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    contact_person_email : {
        type : String,
        trim : true,
        default: null
    },
    wire_type : {//0-DSL, 1-ADSL, 2-OpticalFiber,4-UTP,5-STP
        type : Number,
        required : true,
        default : 0

    },
    division_id : {
        type : String,
        required : true
    }, 
    district_id : {
        type : String,
        required : true
    },
    upazilla_id : {
        type : String,
        required : true
    },
    union_id : {
        type : String,
        required : true
    },
    area_id : {
        type : ObjectID,
        required : true
    },
    resolve_status : {
        type : Boolean,
        default : false
    },
    request_arrival_time : {
        type : Date,
        default : new Date()
    },
    request_resolve_time : {
        type : Date,
        default : null
    },
    isp_id : {
        type : ObjectID,
        required : true
    },
    rejected : {
        type : Boolean,
        default : false
    }


 
})


var UserConnection = mongoose.model('UserConnection', UserConnectionSchema);


module.exports = {UserConnection};
