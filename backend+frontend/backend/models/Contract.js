const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

var ContractSchema = new mongoose.Schema({
    user_type : { // 0- ISP, 1- user, 2 - NTTN
        type : Number,
        required : true
    },
    package_id : {
        type : ObjectID,
        required : true
    },
    isp_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    union_id : {
        type : String,
        default : null
    },
    area_id : {
        type : ObjectID,
        default : null
    },
    start_date : {
        type : Date,
        default : new Date()
    },
    duration : {
        type : Number,
        required : true,
        min : 1
    },
    current : {
        type : Boolean,
        required : true,
        default : false
    }

});


var Contract = mongoose.model('Contract', ContractSchema);

module.exports = {Contract};