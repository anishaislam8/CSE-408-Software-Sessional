const mongoose = require('mongoose');


var LicenseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    license_id : {
        type : String,
        minlength : 6,
        required : true
    },
    valid_until : {
        type : Date,
        required : true
    }
})

var License = mongoose.model('License', LicenseSchema);

module.exports = {License};