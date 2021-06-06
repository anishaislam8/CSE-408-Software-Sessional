const mongoose = require('mongoose');


var SubDistrictSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    district_id : {
        type : String,
        required : true
    },
    upazilla_id : {
        type : String,
        required : true
    }
})

var SubDistrict = mongoose.model('SubDistrict', SubDistrictSchema);

module.exports = {SubDistrict}