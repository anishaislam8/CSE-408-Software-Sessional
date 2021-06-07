const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const moment = require('moment');

var FeedbackSchema = new mongoose.Schema({
    isp_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    user_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    area_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    details: {
        type : String,
        trim : true,
        minlength : 1,
        default : null
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        default : 5,
        required : true

    },
    feedback_arrival_time : {
        type : Date,
        default : new Date()
    }
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = {Feedback};