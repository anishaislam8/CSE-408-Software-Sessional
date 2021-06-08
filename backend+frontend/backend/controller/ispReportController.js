let { ISP } = require('../models/ISP');
let { Report } = require('../models/Report');
let apiController = require('./apiController');

//insert an entry in report table
const handleReporting = async (request, response) => {

    try{
        let request_type = 0;
        let isp_id = request.body.isp_id ;
        let union_id = request.body.union_id ;
        let details = request.body.details;
        let category = request.body.category;
    
        let newReport = new Report ({
            request_type,
            isp_id,
            union_id,
            details,
            category
        })
    
        let data = await newReport.save();
    
        if(data.nInserted === 0){
            return response.status(400).send({
                message : "Insertion Failed",
                data : []
            })
        }
    
        return response.status(200).send({
            message : "Insertion Successful",
            data
        })
    } catch(e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }

   
}

module.exports = {handleReporting}