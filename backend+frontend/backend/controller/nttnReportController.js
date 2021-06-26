let { Report } = require('../models/Report');
let apiController = require('./apiController');


const handleReportFetching = async (request, response) => {
    let reports = await Report.find({
        resolve_status : false
    }).sort({"report_arrival_time": 1});
    try{
        if(reports.length === 0){
            return response.status(404).send({
                message : "No Report Found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Reports Found",
            data : reports

        })
    } catch (e) {
        return response.status(500).send({
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
    let sortByTime = request.body.time; // 1- ascending, -1 : descending 
    let resolve_status = request.body.resolve_status || false;
    let sortByRating = request.body.rating;
    let sortByIsp = request.body.isp_id

    try{
        let reports;

        if(sortByUnion){
            reports = await Report.find({
                union_id : sortByUnion,
                resolve_status
            })  

        } else if(sortBySubDistrict){

            let unions = await apiController.findUnionFromSubDistrict(sortBySubDistrict);
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                resolve_status
            })

        } else if(sortByDistrict){

            let unions = await apiController.findUnionFromDistrict(sortByDistrict);
            
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                resolve_status
            })

        } else if(sortByDivision){

            let unions = await apiController.findUnionFromDivision(sortByDivision);
            
            reports = await Report.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                resolve_status
            })


        }

        if(!reports){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
                return response.status(404).send({
                    message : "No Report Found",
                    data : []
                })
            } else {
               

                if(sortByIsp){
                    reports = await Report.find({
                        resolve_status,
                        isp_id : sortByIsp
                    })
                } else {
                    reports = await Report.find({
                        resolve_status
                    })
                }
                
            }
        } else {
            // further sorting
            if(sortByIsp){
                reports = reports.filter((report) => {
                    return report.isp_id === sortByIsp;
                })
            }
            
        }

        if(!reports || reports.length === 0){
            return response.status(404).send({
                message : "No Reports Found",
                data : []
            })
        }
        
        
        if(sortByTime && sortByRating){
            if(sortByTime === 1 && sortByRating === 1){
                reports.sort((a,b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    if (a.report_arrival_time > b.report_arrival_time) return 1;
                    if (a.report_arrival_time < b.report_arrival_time) return -1;
                })
                
            } else if(sortByTime === 1 && sortByRating === -1){
                reports.sort((a,b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    if (a.report_arrival_time > b.report_arrival_time) return -1;
                    if (a.report_arrival_time < b.report_arrival_time) return 1;
                })
            } else if(sortByTime === -1 && sortByRating === 1){
                reports.sort((a,b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    if (a.report_arrival_time > b.report_arrival_time) return 1;
                    if (a.report_arrival_time < b.report_arrival_time) return -1;
                })
            } else if(sortByTime === -1 && sortByRating === -1){
                reports.sort((a,b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    if (a.report_arrival_time > b.report_arrival_time) return -1;
                    if (a.report_arrival_time < b.report_arrival_time) return 1;
                })
            }
            
        } else if(sortByRating){
            if(sortByRating === 1){
                reports.sort((a,b) => a.rating - b.rating);
            } else if(sortByRating === -1){
                reports.sort((a,b) => b.rating - a.rating);
            }
        } else{
            if(sortByTime){
                if(sortByTime === 1){
                    reports.sort((a,b) => a.report_arrival_time - b.report_arrival_time);
                } else if(sortByTime === -1){
                    reports.sort((a,b) => b.report_arrival_time - a.report_arrival_time);
                }
            } else {
                reports.sort((a,b) => a.report_arrival_time - b.report_arrival_time);
            }
        }

       
        return response.status(200).send({
            message : "Reports Found",
            data : reports
        })
    } catch (e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }

    

}

const handleOneReport = async (request, response) => {
   
    let report_id = request.body.report_id;
    if(!report_id){
        return response.status(400).send({
            message : "Report ID invalid",
            data : []
        })
    }
    try{
        let report = await Report.findById(report_id);
        if(!report || report.request_type !== 0){
            return response.status(404).send({
                message : "Report not found",
                data : []
            })
        }
        return response.status(200).send({
            message : "Report found",
            data : report
        })
    } catch(e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }
}


const handleSolvedReport = async (request, response) => {
    let report_id = request.body.report_id;
    if(!report_id){
        return response.status(400).send({
            message : "Report ID invalid",
            data : []
        })
    }
    try{
        let report = await Report.findById(report_id);
        if(!report || report.request_type !== 0){
            return response.status(404).send({
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
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
}


module.exports = {
    handleReportFetching,
    handleReportFetchingSorted,
    handleOneReport,
    handleSolvedReport
}