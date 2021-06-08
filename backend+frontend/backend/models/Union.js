const mongoose = require('mongoose');


var UnionSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    upazilla_id : {
        type : String,
        required : true
    },
    union_id : {
        type : String,
        required : true
    }
})

var Union = mongoose.model('Union', UnionSchema);

module.exports = {Union}