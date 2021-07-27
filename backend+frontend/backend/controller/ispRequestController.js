const { request, response } = require('express');
const { ObjectID } = require('mongodb');
let { ISP } = require('../models/ISP');
let { Pending } = require('../models/Pending');
let apiController = require('./apiController');
const { UserConnection } = require('../models/UserConnection');
const { PhysicalConnectionISP } =require('../models/PhysicalConnectionISP');
const { Contract } = require('../models/Contract');


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

    const head_office_address = request.body.head_office_address;
    const head_office_telephone = request.body.head_office_telephone;
    const head_office_mobile = request.body.head_office_mobile;
    const head_office_email = request.body.head_office_email;
   
    const office_address = request.body.office_address;
    const office_telephone = request.body.office_telephone;
    const office_mobile = request.body.office_mobile;
    const office_email = request.body.office_email;


    const contact_person_name = request.body.contact_person_name;
    const contact_person_address = request.body.contact_person_address;
    const contact_person_telephone = request.body.contact_person_telephone;
    const contact_person_mobile = request.body.contact_person_mobile;
    const contact_person_email = request.body.contact_person_email;

    const isp_id = ObjectID(request.body.isp_id);
    const password = request.body.password;
    const connection_id = request.body.connection_id;

    try{
        let connection = await PhysicalConnectionISP.findById(connection_id);
        if(!connection){
            return response.send({
                message : "Update unsuccessful",
                data : []
            })
        }

        connection.head_office_address = head_office_address;
        connection.head_office_telephone = head_office_telephone;
        connection.head_office_mobile = head_office_mobile;
        connection.head_office_email = head_office_email;

        connection.office_address = office_address;
        connection.office_telephone = office_telephone;
        connection.office_mobile = office_mobile;
        connection.office_email = office_email;

        connection.contact_person_name = contact_person_name;
        connection.contact_person_address = contact_person_address;
        connection.contact_person_telephone = contact_person_telephone;
        connection.contact_person_mobile = contact_person_mobile;
        connection.contact_person_email = contact_person_email;

        let data = await connection.save();


        let isp = await ISP.findById(isp_id);
        if(!isp){
            return response.send({
                message : "No ISP",
                data : []
            })
        }

        if(password){
            isp.password = password
        } 

        await isp.save();

        


        return response.send({
            message : "Update successful",
            data
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
            if(resolve_status === 1){ // Accepted
                requests = requests.filter((Connection)=> (Connection.resolve_status === true && Connection.rejected === false));
            } else if(resolve_status === -1){ //rejected
                requests = requests.filter((Connection)=> (Connection.resolve_status === true && Connection.rejected === true));
            } else if(resolve_status === 0){ // unsolved
                requests = requests.filter((Connection)=> (Connection.resolve_status === false && Connection.rejected === false));
            }
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

const acceptConnection = async (request, response) => {

    //console.log("called");
    let connection_id = request.body.connection_id;
    let employee_id = request.body.employee_id;
    let resolve_status = true;
    let name = request.body.user_name;
    let password = "123456";
    let nid = request.body.nid;
    let physical_connection_establishment_time = new Date();
    let physical_connection_details = [];
    let request_type = 1; // user ke dicchi 
    let details = request.body.details;
    let isp_id = ObjectID(request.body.isp_id);
    physical_connection_details.push({
        connection_id
    });
    
    try{

        // update connection entry
        let connection = await UserConnection.findById(connection_id);
        if(!connection){
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }

        connection.employee_id = employee_id;
        connection.resolve_status = resolve_status;
        connection.request_resolve_time = new Date();


        connection.save();

        //console.log("creating isp profile");
        // create new ISP profile
        
        let existing = await User.find({
            nid
        });

        let data;
        if(existing.length === 0){ // no user
           
            let newUser = new User ({
                name, password, nid, physical_connection_establishment_time,
                physical_connection_details
            })
    
            data = await newUser.save();
            //console.log("data", data);
    
            if(data.nInserted === 0){
                return response.send({
                    message : "Insertion Failed",
                    data : []
                })
            }
        } else {
            existing.physical_connection_details.push({
                connection_id
            })
            data = await existing.save();
            
        }
       


        // send notification
        let user_id = data._id;
        
        let newNotification = new Notification({
            request_type,
            isp_id,
            details,
            user_id
        })

        let insertedNotification = await newNotification.save();

        if(insertedNotification.nInserted === 0){
            return response.send({
                message : "Insertion failed",
                data : []
            })
        }
        return response.send({
            message : "Sent notification",
            data : insertedNotification
        })


      
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }


    
}

const rejectConnection = async (request, response) => {
    let connection_id = request.body.connection_id;
    let resolve_status = true;
    
    
    try{
        let connection = await UserConnection.findById(connection_id);
        if(!connection){
            return response.send({
                message : "Nothing to show",
                data : []
            })
        }


        connection.resolve_status = resolve_status;
        connection.rejected = true;


        connection.save();

        return response.status(200).send({
            message : "Rejected",
            data : []
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }


    
}

const getAllContractsWithNTTN = async (request, response) => {
    let isp_id = request.body.isp_id;
    if(!isp_id){
        return response.send({
            message : "ISP ID required",
            data : []
        })
    }

    try{
        let contracts = await Contract.find({
            isp_id,
            user_type : 0
        })

        if(!contracts || contracts.length === 0){
            return response.send({
                message : "Not found",
                data : []
            })
        }

        return response.send({
            message : "Found",
            data : contracts
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
    handleConnection,
    acceptConnection,
    rejectConnection,
    getAllContractsWithNTTN
}