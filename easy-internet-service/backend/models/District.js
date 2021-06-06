const mongoose = require('mongoose');


var DistrictSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    division_id : {
        type : String,
        required : true
    },
    district_id : {
        type : String,
        required : true
    }
})

var District = mongoose.model('District', DistrictSchema);

module.exports = {District}