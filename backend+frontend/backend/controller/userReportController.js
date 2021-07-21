let { ISP } = require('../models/ISP');
let { User } = require('../models/User');
let { Report } = require('../models/Report');
let apiController = require('./apiController');
const {ObjectID} = require('mongodb');
const { request, response } = require('express');


//insert an entry in report table
const handleReporting = async (request, response) => {

    try{
        let request_type = 1;
        let isp_id = ObjectID(request.body.isp_id);
        let user_id = ObjectID(request.body.user_id);
        let area_id = ObjectID(request.body.area_id) ;
        let details = request.body.details;
        let category = request.body.category;
        let union_id = await apiController.getUnionFromArea(area_id);
        let rating = await apiController.getRatingFromISP(isp_id);
        //console.log(union_id);
        
        let newReport = new Report ({
            request_type,
            isp_id,
            union_id,
            user_id,
            area_id,
            details,
            category,
            rating
        })
    
        let data = await newReport.save();
    
        if(data.nInserted === 0){
            return response.send({
                message : "Insertion Failed",
                data : []
            })
        }
    
        return response.send({
            message : "Insertion Successful",
            data
        })
    } catch(e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

   
}


const viewOwnReports = async (request, response) => {
    let user_id = request.body.user_id;
    //console.log("called");
    if(!user_id){
        return response.send({
            message : "No Report Found",
            data : []
        })
    }

    user_id = ObjectID(request.body.user_id);

    
    try{
        let reports = await Report.find({
            user_id
        }).sort({"report_arrival_time": 1});
        
        if(reports.length === 0){
            return response.send({
                message : "No Report Found",
                data : []
            })
        }
        reports = reports.filter((report) => report.request_type === 1);
        //console.log(reports);
        return response.status(200).send({
            message : "Reports Found",
            data : reports

        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
}


const handleReportFetchingSortedUser = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let sortByArea = request.body.area_id;
    let resolve_status = request.body.resolve_status;
    let problem_category = request.body.problem_category;
    let user_id = request.body.user_id;

    //console.log(resolve_status);
    user_id = ObjectID(request.body.user_id);
    try{
        let reports;

        if(sortByArea){
            reports = await Report.find({
                area_id : sortByArea, user_id
            }).sort({"report_arrival_time": 1});
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            reports = await Report.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"report_arrival_time": 1});

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            reports = await Report.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"report_arrival_time": 1});

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            reports = await Report.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"report_arrival_time": 1});

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            reports = await Report.find({
                area_id : { "$in": areas.map(area => area._id) }
                , user_id
            }).sort({"report_arrival_time": 1});


        }

        if(!reports){
            if(sortByDistrict || sortBySubDistrict || sortByArea || sortByUnion || sortByDivision ){
                //empty
                return response.send({
                    message : "No Reports Found",
                    data : []
                })
            } else {
                
                reports = await Report.find({
                    user_id
                }).sort({"report_arrival_time": 1});
                
            }
            
            
        }

        if(!reports || reports.length === 0){
            return response.send({
                message : "No Reports Found",
                data : []
            })
        }
        
        if(resolve_status !== undefined){
            reports = reports.filter((report)=> report.resolve_status === resolve_status);
        }
        if(!reports || reports.length === 0){
            return response.send({
                message : "No Reports Found",
                data : []
            })
        }

        if(problem_category){
            reports = reports.filter((report)=> report.category === problem_category);
        }
        if(!reports || reports.length === 0){
            return response.send({
                message : "No Reports Found",
                data : []
            })
        }
        
        reports = reports.filter((report) => report.request_type === 1);

        if(!reports || reports.length === 0){
            return response.send({
                message : "No Reports Found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Reports Found",
            data : reports
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

    

}



module.exports = {
    handleReporting, 
    viewOwnReports,  
    handleReportFetchingSortedUser
}