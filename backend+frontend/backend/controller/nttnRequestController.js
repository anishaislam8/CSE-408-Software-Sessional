let { ISP } = require('../models/ISP');
let { Pending } = require('../models/Pending');
const { PhysicalConnectionISP } = require('../models/PhysicalConnectionISP');

let apiController = require('./apiController');



const getISPConnections = async (request, response) => {
    try{
        let connections = await PhysicalConnectionISP.find();
        if(!connections || connections.length === 0){
            return response.send({
                message : "No data found",
                data : []
            })
        }
        return response.send({
            message : "Found",
            data : connections
        })
    } catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }
}



const handlePending = async (request, response) => {
    try{
        let pendings = await Pending.find({
            request_type : 0,
           
        }).sort({request_arrival_time : 1});

        if(!pendings){
            return response.send({
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
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }
        return response.status(200).send({
            message : "Found",
            data : updatedPendings
        })

    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
    
    
}


const handleRenewal = async (request, response) => {
    try{
        let pendings = await Pending.find({
            request_type : 0,
           
        }).sort({request_arrival_time : 1});

        if(!pendings){
            return response.send({
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
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }
        return response.status(200).send({
            message : "Found",
            data : updatedPendings
        })

    } catch (e) {
        return response.send({
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
            return response.send({
                message : "Insertion failed",
                data : []
            })
        }
    
        return response.status(200).send({
            message : "Insertion Done",
            data
        })
    } catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }

    
}

const handleConnectionFetchingSorted = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    
    
    //console.log(resolve_status);

    try{
        let requests;

        if(sortByUnion){
            requests = await PhysicalConnectionISP.find({
                union_id : sortByUnion
                
            }).sort({"request_arrival_time": 1});

        } else if(sortBySubDistrict){

            let unions = await apiController.findUnionFromSubDistrict(sortBySubDistrict);
            requests = await PhysicalConnectionISP.find({
                union_id : { "$in": unions.map(union => union.union_id) },
               
            }).sort({"request_arrival_time": 1});

        } else if(sortByDistrict){

            let unions = await apiController.findUnionFromDistrict(sortByDistrict);
            
            requests = await PhysicalConnectionISP.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                
            }).sort({"request_arrival_time": 1});

        } else if(sortByDivision){

            let unions = await apiController.findUnionFromDivision(sortByDivision);
            
            requests = await PhysicalConnectionISP.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                
            
            }).sort({"request_arrival_time": 1});


        }
   
        if(!requests){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
              
                return response.send({
                    message : "No Connection Requests Found 1",
                    data : []
                })
            } else {
             
                requests = await PhysicalConnectionISP.find().sort({"request_arrival_time": 1});
         
            }
        }


        if(!requests || requests.length === 0){
      
            return response.send({
                message : "No Connection Requests Found 2",
                data : []
            })
        }
      
       // console.log(resolve_status);

        if(resolve_status !== undefined){
            requests = requests.filter((Connection)=> Connection.resolve_status === resolve_status);
        }

       // console.log(requests);
    
        if(!requests || requests.length === 0){
        
            return response.send({
                message : "No Connection Requests Found 3",
                data : []
            })
        }
      
      
       
        return response.status(200).send({
            message : "Connection Requests Found",
            data : requests
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

    

}


const handlePendingFetchingSorted = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    let package_id = request.body.package_id;
    
    //console.log(resolve_status);

    try{
        let requests;

        if(sortByUnion){
            requests = await Pending.find({
                union_id : sortByUnion,
                request_type :0
                
            }).sort({"request_arrival_time": 1});

        } else if(sortBySubDistrict){

            let unions = await apiController.findUnionFromSubDistrict(sortBySubDistrict);
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
            }).sort({"request_arrival_time": 1});

        } else if(sortByDistrict){

            let unions = await apiController.findUnionFromDistrict(sortByDistrict);
            
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
               
            }).sort({"request_arrival_time": 1});

        } else if(sortByDivision){

            let unions = await apiController.findUnionFromDivision(sortByDivision);
            
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
            
            }).sort({"request_arrival_time": 1});


        }
   
        if(!requests){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
              
                return response.send({
                    message : "No Pending Found 1",
                    data : []
                })
            } else {
             
                requests = await Pending.find({
                    request_type :0
                }).sort({"request_arrival_time": 1});
         
            }
        }


        if(!requests || requests.length === 0){
      
            return response.send({
                message : "No Pendings Found 2",
                data : []
            })
        }
      
       // console.log(resolve_status);

        if(resolve_status !== undefined){
            requests = requests.filter((Pending)=> Pending.status === resolve_status);
        }

       // console.log(requests);
    
        if(!requests || requests.length === 0){
        
            return response.send({
                message : "No Pendings Found 3",
                data : []
            })
        }
        //console.log(package_id);
        if(package_id){
            requests = requests.filter((Pending)=> Pending.package_id.toString() === package_id.toString());
        }

        if(requests.length === 0){
            return response.send({
                message : "No Pendings Found",
                data : []
            })
        }
    

        let updatedPendings = [];

        for(let i = 0; i < requests.length; i++){
    
            let isp = await ISP.findById(requests[i].isp_id);
    
            if(isp && (isp.connection_status === false)){// pending
               
                updatedPendings.push(requests[i]);
            }
        }
  
        if(updatedPendings.length === 0){ // all renewals
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }
      
       
        return response.status(200).send({
            message : "Pendings Found",
            data : updatedPendings
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

    

}

const handleRenewalFetchingSorted = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    let package_id = request.body.package_id;
    //console.log(resolve_status);

    try{
        let requests;

        if(sortByUnion){
            requests = await Pending.find({
                union_id : sortByUnion,
                request_type :0
                
            }).sort({"request_arrival_time": 1});

        } else if(sortBySubDistrict){

            let unions = await apiController.findUnionFromSubDistrict(sortBySubDistrict);
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
            }).sort({"request_arrival_time": 1});

        } else if(sortByDistrict){

            let unions = await apiController.findUnionFromDistrict(sortByDistrict);
            
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
               
            }).sort({"request_arrival_time": 1});

        } else if(sortByDivision){

            let unions = await apiController.findUnionFromDivision(sortByDivision);
            
            requests = await Pending.find({
                union_id : { "$in": unions.map(union => union.union_id) },
                request_type :0
            
            }).sort({"request_arrival_time": 1});


        }

        if(!requests){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
                return response.send({
                    message : "No Pending Found",
                    data : []
                })
            } else {
             
                requests = await Pending.find().sort({"request_arrival_time": 1});
         
            }
        }

        if(!requests || requests.length === 0){
            return response.send({
                message : "No Pendings Found",
                data : []
            })
        }
        
        if(resolve_status !== undefined){
            requests = requests.filter((Pending)=> Pending.status === resolve_status);
        }

        if(requests.length === 0){
            return response.send({
                message : "No Pendings Found",
                data : []
            })
        }

        if(package_id){
            requests = requests.filter((Pending)=> Pending.package_id.toString() === package_id.toString());
        }

        if(requests.length === 0){
            return response.send({
                message : "No Pendings Found",
                data : []
            })
        }

        let updatedPendings = [];

        for(let i = 0; i < requests.length; i++){
            let isp = await ISP.findById(requests[i].isp_id);
       
            if(isp && (isp.connection_status === true)){// renewal
                updatedPendings.push(requests[i]);
            }
        }


        if(updatedPendings.length === 0){ // all new pendings
            return response.status(404).send({
                message : "Nothing to show",
                data : []
            })
        }
        
       
        return response.status(200).send({
            message : "Pendings Found",
            data : updatedPendings
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

    

}


module.exports = {
    handlePending,
    handleRenewal,
    insertPending,
    handlePendingFetchingSorted,
    handleRenewalFetchingSorted,
    handleConnectionFetchingSorted,
    getISPConnections
}