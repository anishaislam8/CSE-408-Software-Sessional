const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const moment = require('moment');

var EmployeeSchema = new mongoose.Schema({
   employee_type : {
       type : Number, // 0-isp, 1- nttn
       required : true
   },
   isp_id : {
        type : ObjectID,
        default : null
   },
   name : {
       type : String,
       minlength : 1,
       trim : true,
       required : true
   },
   nid : {
       type : String,
       minlength : 10,
       maxlength : 10,
       required : true
   },
   address : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
   },
   phone_number : {
        type : String,
        minlength : 14,
        maxlength: 14,
        required : true
   },
   joining_date : {
       type : Date
   },
   leaving_date : {
       type : Date,
       default : null
   }
});

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};




