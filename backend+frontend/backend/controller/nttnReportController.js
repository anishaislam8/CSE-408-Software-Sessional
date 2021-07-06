let { Report } = require('../models/Report');
let apiController = require('./apiController');


const handleReportFetchingUnsolved = async (request, response) => {
    let reports = await Report.find({
        resolve_status : false
    }).sort({"report_arrival_time": 1});
    try{
        if(reports.length === 0){
            return response.send({
                message : "No Report Found",
                data : []
            })
        }
        reports = reports.filter((report) => report.request_type === 0);

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

const handleReportFetchingSolved = async (request, response) => {
    let reports = await Report.find({
        resolve_status : true
    }).sort({"report_arrival_time": 1});
    try{
        if(reports.length === 0){
            return response.send({
                message : "No Report Found",
                data : []
            })
        }
        reports = reports.filter((report) => report.request_type === 0);
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

const handleReportFetching = async (request, response) => {
    let reports = await Report.find().sort({"report_arrival_time": 1});
    try{
        if(reports.length === 0){
            return response.send({
                message : "No Report Found",
                data : []
            })
        }
        reports = reports.filter((report) => report.request_type === 0);
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


const handleReportFetchingSorted = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    let problem_category = request.body.problem_category;
    //console.log(resolve_status);

    try{
        let reports;

        if(sortByUnion){
            reports = await Report.find({
                union_id : sortByUnion
                
            }).sort({"report_arrival_time": 1});

        } else if(sortBySubDistrict){

            let unions = await apiController.findUnionFromSubDistrict(sortBySubDistrict);
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) }
               
            }).sort({"report_arrival_time": 1});

        } else if(sortByDistrict){

            let unions = await apiController.findUnionFromDistrict(sortByDistrict);
            
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) }
               
            }).sort({"report_arrival_time": 1});

        } else if(sortByDivision){

            let unions = await apiController.findUnionFromDivision(sortByDivision);
            
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) }
            
            }).sort({"report_arrival_time": 1});


        }

        if(!reports){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
                return response.send({
                    message : "No Report Found",
                    data : []
                })
            } else {
             
                reports = await Report.find().sort({"report_arrival_time": 1});
         
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

        if(problem_category){
            reports = reports.filter((report)=> report.category === problem_category);
        }

        reports = reports.filter((report) => report.request_type === 0);
        
        

       
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

const handleOneReport = async (request, response) => {
   
    let report_id = request.body.report_id;
    if(!report_id){
        return response.send({
            message : "Report ID invalid",
            data : []
        })
    }
    try{
        let report = await Report.findById(report_id);
        if(!report || report.request_type !== 0){
            return response.send({
                message : "Report not found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Report found",
            data : report
        })
    } catch(e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
}


const handleSolvedReport = async (request, response) => {
    let report_id = request.body.report_id;
    if(!report_id){
        return response.send({
            message : "Report ID invalid",
            data : []
        })
    }
    try{
        let report = await Report.findById(report_id);
        if(!report || report.request_type !== 0){
            return response.send({
                message : "Report not found",
                data : []
            })
        }
        report.resolve_status = true;
        report.report_resolve_time = new Date()

        let updatedReport = await report.save();
        return response.status(200).send({
            message : "Report updated",
            data : updatedReport
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


module.exports = {
    handleReportFetching,
    handleReportFetchingSolved,
    handleReportFetchingUnsolved,
    handleReportFetchingSorted,
    handleOneReport,
    handleSolvedReport
}