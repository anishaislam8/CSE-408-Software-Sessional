let { Notification } = require("../models/Notification");

const sendNotificationToISP = async (request, response) => {
    try{
        let request_type = 0; // isp ke dicchi  
        let isp_id = request.body.isp_id;
        let details=request.body.details;
       
        let newNotification = new Notification({
            request_type,
            isp_id,
            details
        })

        let insertedNotification = await newNotification.save();

        if(insertedNotification.nInserted === 0){
            return response.send({
                message : "Insertion failed",
                data : []
            })
        }
        return response.send({
            message : "Inserted",
            data : insertedNotification
        })
    } catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }
}

module.exports = {
    sendNotificationToISP
}