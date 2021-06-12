const {Feedback} = require('./../models/Feedback');
const {ISP} = require('./../models/ISP');

const handlePostFeedbacks = async (request, response) => {
    const isp_id = request.body.isp_id;
    const user_id = request.body.user_id;
    const details = request.body.details;
    const area_id = request.body.area_id;
    const rating = request.body.rating;


    try {
        let newFeedback = new Feedback({
            isp_id,
            user_id,
            details,
            rating,
            area_id
        });

        let feedback = await newFeedback.save();

        if(feedback.nInserted === 0){
            return response.status(400).send({
                message : "Insertion Failed",
                data : []
            })
        }
        // calculate the new average rating of the isp
     
        let feedbacksOfThisISP = await Feedback.find({
            isp_id
        });
        
        const numberOfFeedbacks = feedbacksOfThisISP.length;
  
        let sum = 0;
        for (let i= 0; i < numberOfFeedbacks; i++){
            sum += feedbacksOfThisISP[i].rating;
        }

        const avgSum = Math.round(sum/numberOfFeedbacks, 1);
     

        let isp = await ISP.findById(isp_id);
        isp.average_rating = avgSum;
        isp.save();
       

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