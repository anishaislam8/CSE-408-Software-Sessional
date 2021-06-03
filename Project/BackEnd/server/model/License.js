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
        require : true
    },
    valid_until : {
        type : Number,
        required : true,
        default : null
    }
})

var License = mongoose.model('License', LicenseSchema);

module.exports = {License};