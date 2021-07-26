const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const {ObjectID} = require('mongodb');


var PhysicalConnectionISPSchema = new mongoose.Schema({
    isp_name : {
        required : true,
        type : String,
        minlength : 1,
        trim : true,
    },
    license_number : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    head_office_address : {
        type : String,
        minlength : 1,
        maxlength : 255,
        trim : true,
        default: null
    },
    head_office_telephone : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    head_office_mobile : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    head_office_email : {
        type : String,
        trim : true,
        default: null
    },
    office_address : {
        type : String,
        minlength : 1,
        maxlength : 255,
        trim : true,
        default: null
    },
    office_telephone : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    office_mobile : {
        type : String,
        minlength : 14,
        maxlength : 14,
        trim : true,
        default: null
    },
    office_email : {
        type : String,
        trim : true,
        default: null
    },
    contact_person_name : {
        type : String,
        minlength : 1,
        trim : true,
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
    rejected : {
        type : Boolean,
        default : false
    }


 
})


var PhysicalConnectionISP = mongoose.model('PhysicalConnectionISP', PhysicalConnectionISPSchema);


module.exports = {PhysicalConnectionISP};
