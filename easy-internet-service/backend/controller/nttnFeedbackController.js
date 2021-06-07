const { Feedback } = require('./../models/Feedback');
const apiController = require('./apiController');

const handleFeedbacks = async (request, response) => {
    try {
        let feedbacks = await Feedback.find().sort({"feedback_arrival_time": -1});
        if(!feedbacks){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Feedbacks found",
            data : feedbacks
        })
    } catch (e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }
}

const handleOneFeedback = async (request, response) => {
    let feedback_id = request.body.feedback_id;
    if(!feedback_id){
        return response.status(400).send({
            message : "Feedback ID invalid",
            data : []
        })
    }
    try {
        let feedback = await Feedback.findById(feedback_id);
        if(!feedback){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Feedback found",
            data : feedback
        })
    } catch (e) {
        return response.status(500).send({
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
    let sortByIsp = request.body.isp_id;
    let sortByRating = request.body.rating; // 1 - ascending, -1 - descending
    let sortByTime = request.body.time; // 1 - ascending, -1 - descending

    try{
        let feedbacks;
        
       
        if(sortByArea){
            feedbacks = await Feedback.find({
                area_id : sortByArea
            })
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            })

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            })

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            }) 

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
            })


        }

        if(!feedbacks){
            if(sortByDistrict || sortBySubDistrict || sortByArea || sortByUnion || sortByDivision ){
                //empty
                return response.status(404).send({
                    message : "No Feedbacks Found",
                    data : []
                })
            } else {
                if(sortByIsp){
                    feedbacks = await Feedback.find({
                        isp_id : sortByIsp
                    })
                } else {
                    feedbacks = await Feedback.find()
                }
            }
            
            
        } else {
            // further sorting
            if(sortByIsp){
                feedbacks = feedbacks.filter((feedback) => {
                    return feedback.isp_id === sortByIsp;
                })
            }
            
        }

        if(!feedbacks || feedbacks.length === 0){
            return response.status(404).send({
                message : "No Feedbacks Found",
                data : []
            })
        }

        if(sortByTime && sortByRating){
            if(sortByTime === 1 && sortByRating === 1){
                feedbacks.sort((a,b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    if (a.feedback_arrival_time > b.feedback_arrival_time) return 1;
                    if (a.feedback_arrival_time < b.feedback_arrival_time) return -1;
                })
                
            } else if(sortByTime === 1 && sortByRating === -1){
                feedbacks.sort((a,b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    if (a.feedback_arrival_time > b.feedback_arrival_time) return -1;
                    if (a.feedback_arrival_time < b.feedback_arrival_time) return 1;
                })
            } else if(sortByTime === -1 && sortByRating === 1){
                feedbacks.sort((a,b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    if (a.feedback_arrival_time > b.feedback_arrival_time) return 1;
                    if (a.feedback_arrival_time < b.feedback_arrival_time) return -1;
                })
            } else if(sortByTime === -1 && sortByRating === -1){
                feedbacks.sort((a,b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    if (a.feedback_arrival_time > b.feedback_arrival_time) return -1;
                    if (a.feedback_arrival_time < b.feedback_arrival_time) return 1;
                })
            }
            
        } else if(sortByRating){
            if(sortByRating === 1){
                feedbacks.sort((a,b) => a.rating - b.rating);
            } else if(sortByRating === -1){
                feedbacks.sort((a,b) => b.rating - a.rating);
            }
        } else{
            if(sortByTime){
                if(sortByTime === 1){
                    feedbacks.sort((a,b) => a.feedback_arrival_time - b.feedback_arrival_time);
                } else if(sortByTime === -1){
                    feedbacks.sort((a,b) => b.feedback_arrival_time - a.feedback_arrival_time);
                }
            } else {
                feedbacks.sort((a,b) => b.feedback_arrival_time - a.feedback_arrival_time);
            }
        }

        return response.status(200).send({
            message : "Feedbacks Found",
            data : feedbacks
        })
    } catch (e) {
        return response.status(500).send({
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