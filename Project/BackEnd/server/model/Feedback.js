const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var FeedbackSchema = new mongoose.Schema({
    isp_id : {
        type : ObjectID,
        default : null
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    details: {
        type : String,
        trim : true,
        minlength : 1
    },
    rating : {
        type : Boolean,
        min : 1,
        max : 5,
        default : 5
    },
    feedback_arrival_time : {
        type : Number,
        default : moment().valueOf()
    }
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = {Feedback};