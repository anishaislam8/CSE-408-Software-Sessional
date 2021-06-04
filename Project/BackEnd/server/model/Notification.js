const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var NotificationSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
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
        minlength : 1,
    },
    seen_status : {
        type : Boolean,
        default : false
    },
    notification_arrival_time : {
        type : Number,
        default : moment().valueOf()
    }
});

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = {Notification};