let { ISP } = require('../models/ISP');
let { Pending } = require('../models/Pending');

const handlePending = async (request, response) => {
    try{
        let pendings = await Pending.find({
            request_type : 0,
            status : false
        }).sort({request_arrival_time : 1});

        if(!pendings){
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }

        let updatedPendings = [];

        for(let i = 0; i < pendings.length; i++){
            let isp = await ISP.findById(pendings[i].isp_id);
       
            if(isp && (isp.connection_status === false)){// pending
                updatedPendings.push(pendings[i]);
            }
        }


        if(updatedPendings.length === 0){ // all renewals
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }
        return response.status(200).send({
            message : "Found",
            data : updatedPendings
        })

    } catch (e) {
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }
    
    
}


const handleRenewal = async (request, response) => {
    try{
        let pendings = await Pending.find({
            request_type : 0,
            status : false
        }).sort({request_arrival_time : 1});

        if(!pendings){
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }

        let updatedPendings = [];

        for(let i = 0; i < pendings.length; i++){
            let isp = await ISP.findById(pendings[i].isp_id);
       
            if(isp && (isp.connection_status === true)){// pending
                updatedPendings.push(pendings[i]);
            }
        }


        if(updatedPendings.length === 0){ // all pendings
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }
        return response.status(200).send({
            message : "Found",
            data : updatedPendings
        })

    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
    
    
}

const insertPending = async (request, response) => {
    const request_type  = 0;
    const isp_id = request.body.isp_id;
    const union_id = request.body.union_id;
    const package_id = request.body.package_id;

    try{
        var newPending = new Pending({
            request_type,union_id,package_id,isp_id
        })
    
        let data = await newPending.save();
        if(data.nInserted === 0){
            return response.status(400).send({
                message : "Insertion failed",
                data : []
            })
        }
    
        return response.status(200).send({
            message : "Insertion Done",
            data
        })
    } catch(e){
        return response.status(500).send({
            message : e.message,
            data : []
        })
    }

    
}



module.exports = {
    handlePending,
    handleRenewal,
    insertPending
}