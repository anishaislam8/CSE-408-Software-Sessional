const { ObjectID } = require('mongodb');
const {Feedback} = require('./../models/Feedback');
const {ISP} = require('./../models/ISP');
const apiController = require('./apiController');

const handleFeedbacks = async (request, response) => {

    let user_id = request.body.user_id;
    if(!user_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    user_id = ObjectID(request.body.user_id);
    try {
        let feedbacks = await Feedback.find({
            user_id
        }).sort({"feedback_arrival_time": -1});
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



const handleFeedbackSorted = async (request, response) => {

    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let sortByArea = request.body.area_id;
    let user_id = request.body.user_id;

    if(!user_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    user_id = ObjectID(request.body.user_id);
    
  
    try{
        let feedbacks;
        
       
        if(sortByArea){
            feedbacks = await Feedback.find({
                area_id : sortByArea, user_id
            }).sort({"feedback_arrival_time": -1});
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"feedback_arrival_time": -1});

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"feedback_arrival_time": -1});

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"feedback_arrival_time": -1});

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            feedbacks = await Feedback.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
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
                
                feedbacks = await Feedback.find({
                    user_id
                }).sort({"feedback_arrival_time": -1});
                
            }
            
            
        }

        if(!feedbacks || feedbacks.length === 0){
            return response.send({
                message : "No Feedbacks Found",
                data : []
            })
        }

        console.log("Feedbacks",feedbacks);
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


const handlePostFeedbacks = async (request, response) => {
    const isp_id = ObjectID(request.body.isp_id);
    const user_id = ObjectID(request.body.user_id);
    const details = request.body.details;
    const area_id = ObjectID(request.body.area_id);
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
        //console.log("ISP",isp);
        //console.log(avgSum);
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
    handlePostFeedbacks,
    handleFeedbackSorted,
    handleFeedbacks
}