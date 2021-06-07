const {Feedback} = require('./../models/Feedback');

const handlePostFeedbacks = async (request, response) => {
    const isp_id = request.body.isp_id;
    const user_id = request.body.user_id;
    const details = request.body.details;
    const rating = request.body.rating;


    try {
        let newFeedback = new Feedback({
            isp_id,
            user_id,
            details,
            rating
        });

        let feedback = await newFeedback.save();

        if(feedback.nInserted === 0){
            return response.status(400).send({
                message : "Insertion Failed",
                data : []
            })
        }

        return response.status(200).send({
            message : "Insertion Successful",
            data : feedback
        })
    } catch(e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }
}

module.exports = {
    handlePostFeedbacks
}