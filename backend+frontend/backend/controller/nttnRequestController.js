const { request } = require('express');
let { ISP } = require('../models/ISP');
let { Pending } = require('../models/Pending');
const { PhysicalConnectionISP } = require('../models/PhysicalConnectionISP');
let { Notification } = require("../models/Notification");
let {Payment} = require('../models/Payment')
let { Package } = require('../models/Package')
let { Contract } = require('../models/Contract')

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
        console.log("here",pendings);
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
            status : false
           
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
    const payment_id = request.body.payment_id;

    try{
        var newPending = new Pending({
            request_type,union_id,package_id,isp_id, payment_id
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
    console.log("called");
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let resolve_status = request.body.resolve_status;
    
    
    

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
            return response.send({
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
            return response.send({
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

const handlePendingAccepted = async (request, response) => {
    let pending_id = request.body.pending_id;
    //console.log("shit1");
    if (!pending_id) {
      return response.status(400).send({
        message: "Pending ID invalid",
        data: [],
      });
    }
  
    try {
      let pending = await Pending.findById(pending_id);
      let payment = await Payment.findById(pending.payment_id);
      let isp = await ISP.findById(pending.isp_id);
  
      if (!isp._id) {
        return response.send({
          message: "ISP ID invalid",
          data: [],
        });
      }
      if (!payment._id) {
        return response.send({
          message: "Payment ID invalid",
          data: [],
        });
      }
  
      payment.payment_status = true;
      let package = await Package.findById(payment.package_id);
      if (!package._id) {
        return response.send({
          message: "Package ID invalid",
          data: [],
        });
      }
      if (isp.connection_status === false) {
        isp.connection_status = true;
        isp.average_rating = 5;
        isp.connection_establishment_time = new Date();
        isp.expiration_date = new Date() + package.duration;
      } else if (isp.connection_status === true) {
        isp.expiration_date = new Date(isp.expiration_date) + package.duration;
      }
  
      let user_type = 0;
      let isp_id = payment.isp_id;
      let package_id = payment.package_id;
      let union_id = payment.union_id;
      let duration = package.duration;
      let current = true;
      let payment_id = payment._id;
  
      let newContract = new Contract({
        user_type,
        isp_id,
        union_id,
        package_id,
        duration,
        current,
        payment_id
      });
  
      let data = await newContract.save();
      console.log("Contract", data)
  
      if (data.nInserted === 0) {
        return response.status(400).send({
          message: "Insertion Failed",
          data: [],
        });
      }
    //   pending.status = true;
      pending.request_accept_time = new Date();
  
      let updatedpending = await pending.save();
      let updatedisp = await isp.save();
      let updatedpayment = await payment.save();
  
      //console.log("HIII");
      return response.status(200).send({
        message: "Contract insertion Successful and Payment and ISP updated",
        data: data + "\n" + updatedisp + "\n" + updatedpayment,
      });
  
      // return response.status(200).send({
      //   message: "payment updated",
      //   data: updatedpayment,
      // });
    } catch (e) {
        console.log(e.message);
      return response.send({
         
        message: e.message,
        data: [],
      });
    }
  };

  const handleRenewalAccepted = async (request, response) => {
    let pending_id = request.body.pending_id;
    //console.log("shit1");
    if (!pending_id) {
      return response.status(400).send({
        message: "Pending ID invalid",
        data: [],
      });
    }
  
    try {
      let pending = await Pending.findById(pending_id);
      let payment = await Payment.findById(pending.payment_id);
      let isp = await ISP.findById(pending.isp_id);
  
      if (!isp._id) {
        return response.send({
          message: "ISP ID invalid",
          data: [],
        });
      }
      if (!payment._id) {
        return response.send({
          message: "Payment ID invalid",
          data: [],
        });
      }
  
      payment.payment_status = true;
      let package = await Package.findById(payment.package_id);
      if (!package._id) {
        return response.send({
          message: "Package ID invalid",
          data: [],
        });
      }
      if (isp.connection_status === false) {
        isp.connection_status = true;
        isp.average_rating = 5;
        isp.connection_establishment_time = new Date();
        isp.expiration_date = new Date() + package.duration;
      } else if (isp.connection_status === true) {
        isp.expiration_date = new Date(isp.expiration_date) + package.duration;
      }
  
      let user_type = 0;
      let isp_id = payment.isp_id;
      let package_id = payment.package_id;
      let union_id = payment.union_id;
      let duration = package.duration;
      let current = true;
      let payment_id = payment._id;

      // make the previous contracts inactive

      let contracts = await Contract.find({
          user_type,
          isp_id
      })

      for(let i= 0; i < contracts.length; i++){
          contracts[i].current = false;
      }

      for(let i= 0; i < contracts.length; i++){
        await contracts[i].save()
        }
  
        // create the new contract
      let newContract = new Contract({
        user_type,
        isp_id,
        union_id,
        package_id,
        duration,
        current,
        payment_id
      });
  
      let data = await newContract.save();
      console.log("Contract", data)
  
      if (data.nInserted === 0) {
        return response.status(400).send({
          message: "Insertion Failed",
          data: [],
        });
      }
      pending.status = true;
      pending.request_accept_time = new Date();
  
      let updatedpending = await pending.save();
      let updatedisp = await isp.save();
      let updatedpayment = await payment.save();
  
      //console.log("HIII");
      return response.status(200).send({
        message: "Contract insertion Successful and Payment and ISP updated",
        data: data + "\n" + updatedisp + "\n" + updatedpayment,
      });
  
      // return response.status(200).send({
      //   message: "payment updated",
      //   data: updatedpayment,
      // });
    } catch (e) {
        console.log(e.message);
      return response.send({
         
        message: e.message,
        data: [],
      });
    }
  };
  
  const handleOnePending = async (request, response) => {
    let request_id = request.body._id;
    if (!request_id) {
      return response.send({
        message: "Pending ID invalid",
        data: [],
      });
    }
    try {
      let pendings = await Pending.findById(request_id);
      let isp = await ISP.findById(pendings.isp_id);
  
      if (!pendings || pendings.request_type !== 0) {
        return response.send({
          message: "Pending not found",
          data: [],
        });
      }
  
      if (isp && isp.connection_status === true) {
        return response.send({
          message: "Not pending request",
          data: [],
        });
      }
  
      return response.status(200).send({
        message: "Pending found",
        data: pendings,
      });
    } catch (e) {
      return response.send({
        message: e.message,
        data: [],
      });
    }
  };
  
  const handleOneRenewal = async (request, response) => {
    let request_id = request.body._id;
    if (!request_id) {
      return response.send({
        message: "Renewal ID invalid",
        data: [],
      });
    }
    try {
      let pendings = await Pending.findById(request_id);
      let isp = await ISP.findById(pendings.isp_id);
  
      if (!pendings || pendings.request_type !== 0) {
        return response.send({
          message: "Renewal not found",
          data: [],
        });
      }
  
      if (isp && isp.connection_status === false) {
        return response.send({
          message: "Not renewal request",
          data: [],
        });
      }
  
      return response.status(200).send({
        message: "Renewal found",
        data: pendings,
      });
    } catch (e) {
      return response.send({
        message: e.message,
        data: [],
      });
    }
  };
  
  

const acceptConnection = async (request, response) => {

    //console.log("called");
    let connection_id = request.body.connection_id;
    let employee_id = request.body.employee_id;
    let resolve_status = true;
    let name = request.body.isp_name;
    let password = "123456";
    let license_id = request.body.license_id;
    let physical_connection_establishment_time = new Date();
    let physical_connection_details = [];
    let request_type = 0; // isp ke dicchi 
    let details = request.body.details;
    physical_connection_details.push({
        connection_id
    });
    
    try{

        // update connection entry
        let connection = await PhysicalConnectionISP.findById(connection_id);
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
        
        let existing = await ISP.find({
            license_id
        });

        let data;
        if(existing.length === 0){ // no isp
           
            let newISP = new ISP ({
                name, password, license_id, physical_connection_establishment_time,
                physical_connection_details
            })
    
            data = await newISP.save();
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
        let isp_id = data._id;
        
        let newNotification = new Notification({
            request_type,
            isp_id,
            details
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
        let connection = await PhysicalConnectionISP.findById(connection_id);
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


module.exports = {
    handlePending,
    handleRenewal,
    insertPending,
    handlePendingFetchingSorted,
    handleRenewalFetchingSorted,
    handleConnectionFetchingSorted,
    getISPConnections,
    acceptConnection,
    rejectConnection,
    handlePendingAccepted,
    handleRenewalAccepted,
  handleOnePending,
  handleOneRenewal,
}