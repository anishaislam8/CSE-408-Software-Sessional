let { NTTN } = require('./../models/NTTN');
let { Report } = require('./../models/Report');
let apiController = require('./apiController');


const handleReportFetching = async (request, response) => {
    let reports = await Report.find();
    try{
        if(!reports){
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
    let sortByPackage = request.body.package_id;

    try{
        let reports;
        if(sortByUnion){
            reports = await Report.find({
                union_id : sortByUnion
            }).sort({"report_arrival_time": -1}); // 1- ascending, -1 : descending 

        } else if(sortBySubDistrict){

            let unions = apiController.findUnionFromSubDistrict(sortBySubDistrict);
            reports = await Report.find({
                union_id : { $in: unions }
            }).sort({"report_arrival_time": -1});

        } else if(sortByDistrict){

            let unions = apiController.findUnionFromDistrict(sortByDistrict);
            reports = await Report.find({
                union_id : { $in: unions }
            }).sort({"report_arrival_time": -1});

        } else if(sortByDivision){

            let unions = apiController.findUnionFromDivision(sortByDivision);
            reports = await Report.find({
                union_id : { $in: unions }
            }).sort({"report_arrival_time": -1});

        }
        if(!reports){
            return response.status(404).send({
                message : "No Reports Found",
                data : []
            })
        }

        let result = [];
        if(sortByPackage){
            result = reports.filter((report) => {
                return report.package_id === sortByPackage;
            })
        } else {
            for(let i = 0; i < reports.length; i++){
                result.push(reports[i]);
            }
        }
        return response.status(200).send({
            message : "Reports Found",
            data : result
        })
    } catch (e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }

    

}


module.exports = {
    handleReportFetching,
    handleReportFetchingSorted
}