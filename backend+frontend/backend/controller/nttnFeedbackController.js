const { Feedback } = require('./../models/Feedback');
const apiController = require('./apiController');

const handleFeedbacks = async (request, response) => {
    try {
        let feedbacks = await Feedback.find().sort({"feedback_arrival_time": -1});
        if(!feedbacks){
            return response.send({
                message : "Not found",
                data : []
            })
        }
        return response.send({
            message : "Feedbacks found",
            data : feedbacks
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
}

const handleOneFeedback = async (request, response) => {
    let feedback_id = request.body.feedback_id;
    if(!feedback_id){
        return response.send({
            message : "Feedback ID invalid",
            data : []
        })
    }
    try {
        let feedback = await Feedback.findById(feedback_id);
        if(!feedback){
            return response.send({
                message : "Not found",
                data : []
            })
        }
        return response.send({
            message : "Feedback found",
            data : feedback
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
}

const handleFeedbackSorted = async (request, response) => {

    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let sortByArea = request.body.area_id;
    
  
    try{
        let feedbacks;
        
       
        if(sortByArea){
            feedbacks = await Feedback.find({
                area_id : sortByArea
            }).sort({"feedback_arrival_time": -1});
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            }).sort({"feedback_arrival_time": -1});

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            }).sort({"feedback_arrival_time": -1});

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            }).sort({"feedback_arrival_time": -1});

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            }).sort({"feedback_arrival_time": -1});


        }

        if(!feedbacks){
            if(sortByDistrict || sortBySubDistrict || sortByArea || sortByUnion || sortByDivision ){
                //empty
                return response.send({
                    message : "No Feedbacks Found",
                    data : []
                })
            } else {
                
                feedbacks = await Feedback.find().sort({"feedback_arrival_time": -1});
                
            }
            
            
        }

        if(!feedbacks || feedbacks.length === 0){
            return response.send({
                message : "No Feedbacks Found",
                data : []
            })
        }


        return response.send({
            message : "Feedbacks Found",
            data : feedbacks
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
}

module.exports = {
    handleFeedbacks,
    handleOneFeedback,
    handleFeedbackSorted
}