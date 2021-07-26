const { request, response } = require('express');
const { ObjectID } = require('mongodb');
let { ISP } = require('../models/ISP');
let { Pending } = require('../models/Pending');
let apiController = require('./apiController');
const { UserConnection } = require('../models/UserConnection');


const getUserConnections = async (request, response) => {
    try{
        let connections = await UserConnection.find();
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


const handleConnection = async (request, response) => {
    let isp_id = ObjectID(request.body.isp_id);
    if(!isp_id){
        return response.send({
            message : "Nothing to show",
            data : []
        })
    }
    try{
        let connections = await UserConnection.find({
            isp_id
        }).sort({request_arrival_time : 1});

        if(!connections){
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }

        
        return response.status(200).send({
            message : "Found",
            data : connections
        })

    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
    
    
}
const handlePending = async (request, response) => {
    let isp_id = ObjectID(request.body.isp_id);
    if(!isp_id){
        return response.send({
            message : "Nothing to show",
            data : []
        })
    }
    try{
        let pendings = await Pending.find({
            request_type : 1,
            isp_id
        }).sort({request_arrival_time : 1});

        if(!pendings){
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }

        
        return response.status(200).send({
            message : "Found",
            data : pendings
        })

    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }
    
    
}

const handleEditProfile = async (request, response) => {
    const newPass = request.body.password;
    const isp_id = request.body.isp_id;

    try{
        let isp = await ISP.findById(isp_id);
        isp.password = newPass;
        let newISP = await isp.save();

        return response.send({
            message : "Update successful",
            data : newISP
        })
    } catch(e){
        return response.send({
            message : e.message,
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


const handlePendingFetchingSorted = async (request, response) => {
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByArea = request.body.area_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    let package_id = request.body.package_id;
    let isp_id = ObjectID(request.body.isp_id)
    
    //console.log(resolve_status);

    try{
        let requests;

        if(sortByArea){
            requests = await Pending.find({
                area_id : sortByArea, isp_id, request_type:1
            }).sort({"request_arrival_time": 1});
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            requests = await Pending.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id, request_type:1
            }).sort({"request_arrival_time": 1});

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            requests = await Pending.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id, request_type:1
            }).sort({"request_arrival_time": 1});

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            requests = await Pending.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id, request_type:1
            }).sort({"request_arrival_time": 1});

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            requests = await Pending.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id, request_type:1
            }).sort({"request_arrival_time": 1});


        }
        if(!requests){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion || sortByArea){
                //empty
              
                return response.send({
                    message : "No Pending Found 1",
                    data : []
                })
            } else {
             
                requests = await Pending.find({
                    request_type :1,
                isp_id
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
    

       
      
       
        return response.status(200).send({
            message : "Pendings Found",
            data : requests
        })
    } catch (e) {
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
    let sortByArea = request.body.area_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    
    let isp_id = ObjectID(request.body.isp_id)
    
    //console.log(resolve_status);

    try{
        let requests;

        if(sortByArea){
            requests = await UserConnection.find({
                area_id : sortByArea, isp_id
            }).sort({"request_arrival_time": 1});
        }
        else if(sortByUnion){
            let areas = await apiController.findAreaFromUnion(sortByUnion);
            requests = await UserConnection.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id
            }).sort({"request_arrival_time": 1});

        } else if(sortBySubDistrict){

            let areas = await apiController.findAreaFromSubDistrict(sortBySubDistrict);
            requests = await UserConnection.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id
            }).sort({"request_arrival_time": 1});

        } else if(sortByDistrict){

            let areas = await apiController.findAreaFromDistrict(sortByDistrict);
            requests = await UserConnection.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id
            }).sort({"request_arrival_time": 1});

        } else if(sortByDivision){

            let areas = await apiController.findAreaFromDivision(sortByDivision);
            requests = await UserConnection.find({
                area_id : { "$in": areas.map(area => area._id) }
                , isp_id
            }).sort({"request_arrival_time": 1});


        }
        if(!requests){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion || sortByArea){
                //empty
              
                return response.send({
                    message : "No Connections Found 1",
                    data : []
                })
            } else {
             
                requests = await UserConnection.find({
                    isp_id
                }).sort({"request_arrival_time": 1});
         
            }
        }


        if(!requests || requests.length === 0){
      
            return response.send({
                message : "No Connections Found 2",
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
                message : "No Connections Found 3",
                data : []
            })
        }
       
        return response.status(200).send({
            message : "Connections Found",
            data : requests
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
    insertPending,
    handlePendingFetchingSorted,
    handleConnectionFetchingSorted,
    handleEditProfile,
    getUserConnections,
    handleConnection
}