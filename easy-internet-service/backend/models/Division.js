const mongoose = require('mongoose');


var DivisionSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    division_id : {
        type : String,
        required : true
    }
})


var Division = mongoose.model('Division', DivisionSchema);

module.exports = {Division}