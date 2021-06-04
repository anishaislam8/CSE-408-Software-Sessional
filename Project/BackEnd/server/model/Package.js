const mongoose = require('mongoose');


var PackageSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    package_type : {
        type : Number,
        required : true
    },
    bandwidth : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

var Package = mongoose.Model('Package', PackageSchema);

module.exports = {Package}