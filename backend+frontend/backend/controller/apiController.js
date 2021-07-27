const { District } = require('./../models/District');
const { Division } = require('./../models/Division');
const { SubDistrict } = require('./../models/Subdistrict');
const { Union } = require('./../models/Union');
const { Area } = require('./../models/Area');
const { ISP } = require('./../models/ISP');
const { User } = require('./../models/User');
const { Package } = require('./../models/Package');
const { Contract } = require('../models/Contract');
const { NTTN} = require('../models/NTTN');
const { request, response } = require('express');
const { connection } = require('mongoose');





const findAreaFromUnion = async(union) => {
    let areas = await Area.find({
        union_id : union
    });

    return areas;
}

const findAreaFromSubDistrict = async (subdistrict) => {
    let unions = await Union.find({
        upazilla_id : subdistrict
    });

    let areas = await Area.find({
        union_id : { $in : unions.map(union => union.union_id) }
    });

    return areas;
}

const findAreaFromDistrict = async (district) => {
    let subdistricts = await SubDistrict.find({
        district_id : district
    });
    let unions = await Union.find({
        upazilla_id : { $in : subdistricts.map(subdistrict => subdistrict.upazilla_id)}
    });
    let areas = await Area.find({
        union_id : { $in : unions.map(union => union.union_id) }
    });

    return areas;
}

const findAreaFromDivision = async (division) => {
    let districts = await District.find({
        division_id : division
    });
    let subdistricts = await SubDistrict.find({
        district_id : { $in : districts.map(district => district.district_id)}
    });
    let unions = await Union.find({
        upazilla_id : { $in : subdistricts.map(subdistrict => subdistrict.upazilla_id)}
    });
    let areas = await Area.find({
        union_id : { $in : unions.map(union => union.union_id) }
    });

    return areas;
}

const findUnionFromSubDistrict = async (subdistrict) => {
    let unions = await Union.find({
        upazilla_id : subdistrict
    });

    return unions;
}

const findUnionFromDistrict = async (district) => {
    let subdistricts = await SubDistrict.find({
        district_id : district
    });

    let unions = await Union.find({
        upazilla_id : { $in : subdistricts.map(subdistrict => subdistrict.upazilla_id) }
    });

    return unions;
}
const findSubDistrictFromDivision = async (division) => {
    let districts = await District.find({
        division_id : division
    });
    let subdistricts = await SubDistrict.find({
        district_id : { $in : districts.map(district => district.district_id)}
    });
    return subdistricts;
}
const findUnionFromDivision = async (division) => {
    let districts = await District.find({
        division_id : division
    });
    let subdistricts = await SubDistrict.find({
        district_id : { $in : districts.map(district => district.district_id)}
    });
    let unions = await Union.find({
        upazilla_id : { $in : subdistricts.map(subdistrict => subdistrict.upazilla_id) }
    });

    return unions;
}

const getUnionFromArea = async (areaId) => {
    let areas = await Area.find();
   //console.log(areas);
    for(let i = 0; i < areas.length; i++){
        if(areas[i]._id.toString() === areaId.toString()){
            //console.log(areas[i].union_id);
            return areas[i].union_id;
        }
    }
}

const getIspsOfUpazilla= async (request, response) => {

    let upazilla_id = request.body.upazilla_id;

    if(!upazilla_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    try{

        let unions = await findUnionFromSubDistrict(upazilla_id);
       
  
        let contracts = await Contract.find({
            union_id : { $in : unions.map(union => union.union_id)},
            user_type : 0
        });

       
        if(!contracts || contracts.length === 0){
      
            return response.send({
                message : "Not found",
                data : []
            })
        }

        //console.log(contracts);
        let allIsps = await ISP.find();
        let isps = allIsps.filter((allIsp) => contracts.map((contract) => contract.isp_id.toString()).includes(allIsp._id.toString()) );
        if(isps.length > 0){
            isps = isps.sort((a,b) => b.average_rating - a.average_rating )
        }
        //console.log("Unions ",unions);
        return response.send({
            message : "Found",
            data : isps
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


const getIspsOfDistrict= async (request, response) => {

    let district_id = request.body.district_id;

    if(!district_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    try{

        let unions = await findUnionFromDistrict(district_id);
       
  
        let contracts = await Contract.find({
            union_id : { $in : unions.map(union => union.union_id)},
            user_type : 0
        });

       
        if(!contracts || contracts.length === 0){
      
            return response.send({
                message : "Not found",
                data : []
            })
        }

        //console.log(contracts);
        let allIsps = await ISP.find();
        let isps = allIsps.filter((allIsp) => contracts.map((contract) => contract.isp_id.toString()).includes(allIsp._id.toString()) );
        
        if(isps.length > 0){
            isps = isps.sort((a,b) => b.average_rating - a.average_rating )
        }
        //console.log("Unions ",unions);
        return response.send({
            message : "Found",
            data : isps
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


const getIspsOfDivision= async (request, response) => {

    let division_id = request.body.division_id;
    // console.log("division_id", division_id);
    if(!division_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    try{

        let unions = await findUnionFromDivision(division_id);
       
        let contracts = await Contract.find({
            union_id : { $in : unions.map(union => union.union_id)},
            user_type : 0
        });

       //console.log("contracts : ", contracts)
        if(!contracts || contracts.length === 0){
      
            return response.send({
                message : "Not found",
                data : []
            })
        }

        //console.log(contracts);
        let allIsps = await ISP.find();
        
        let isps = allIsps.filter((allIsp) => contracts.map((contract) => contract.isp_id.toString()).includes(allIsp._id.toString()) );
        if(isps.length > 0){
            isps = isps.sort((a,b) => b.average_rating - a.average_rating )
        }
        return response.send({
            message : "Found",
            data : isps
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}

const getRatingFromISP = async (ispId) =>{
    let isps = await ISP.find();

    for(let i = 0; i < isps.length; i++){
        if(isps[i]._id.toString() === ispId.toString()){
            return isps[i].average_rating
        }
    }

}

const getISP = async (request, response) => {
   
    try{
        let isp = await ISP.find();
        if(!isp){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : isp
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getAllLocationData = async(request, respone) => {
    try{
        let union = await Union.find();
        if(!union){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        let area = await Area.find();
        if(!area){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        let division = await Division.find();
        if(!division){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        let district = await District.find();
        if(!district){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        let subdistrict = await SubDistrict.find();
        if(!subdistrict){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : {
                union, area, division, district, subdistrict
            }
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
}

const getUnion = async (request, response) => {
    
    try{
        let union = await Union.find();
        if(!union){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : union
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getArea = async (request, response) => {
   
    try{
        let area = await Area.find();
        if(!area){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : area
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getDivision = async (request, response) => {
   
    try{
        let division = await Division.find();
        if(!division){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : division
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getDistrict = async (request, response) => {
   
    try{
        let district = await District.find();
        if(!district){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : district
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getSubDistrict = async (request, response) => {
   
    try{
        let subdistrict = await SubDistrict.find();
        if(!subdistrict){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : subdistrict
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}



const getIspPackage = async (request, response) => {
   
    try{
        let package = await Package.find({
            package_type : 0
        });
        if(!package){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : package
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getUserPackage = async (request, response) => {
   
    try{
        let package = await Package.find({
            package_type : 1
        });
        if(!package){
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : package
        })
    } catch (e) {
        return response.status(500).send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const getUser = async (request, response) => {
   
    try{
        let user = await User.find();
        if(!user){
            return response.send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : user
        })
    } catch (e) {
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}


const getNTTN = async (request, response) => {
   
    try{
        let nttn = await NTTN.find();
        if(!nttn){
            return response.send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : nttn
        })
    } catch (e) {
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const postNTTN = async (request, response) => {
   const username = request.body.username;
   const password = request.body.password;
    try{
        let newNTTN = new NTTN ({
            username, password
        })
    
        let data = await newNTTN.save();
    
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
    } catch (e) {
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
   
}

const postISP = async (request, response) => {
    const name = request.body.isp_name;
    const password = "123456";
    const license_id = reques.body.license_id;
    const physical_connection_establishment_time = new Date();
    const connection_id = request.body.connection_id;
    const physical_connection_details = [];
    physical_connection_details.push({
        connection_id
    });

     try{
         let existing = await ISP.find({
             license_id
         });
         if(existing){
            return response.send({
                message : "Already exists",
                data : []
            })
         }
         let newISP = new ISP ({
            name, password, license_id, physical_connection_establishment_time,
            physical_connection_details
         })
     
         let data = await newISP.save();
     
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
     } catch (e) {
         return response.send({
             message : "EXCEPTION",
             data : []
         })
     }
    
 }

const getUnionOfISP = async (request, response) => {

    let isp_id = request.body.isp_id;

    if(!isp_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    try{
        isp_id = ObjectID(request.body.isp_id);
  
        let contracts = await Contract.find({
            isp_id,
            user_type : 0
        });

       
        if(!contracts || contracts.length === 0){
      
            return response.send({
                message : "Not found",
                data : []
            })
        }

        //console.log(contracts);
        let allUnions = await Union.find();
        let unions = allUnions.filter((allUnion) => contracts.map((contract) => contract.union_id).includes(allUnion.union_id) );
        
        //console.log("Unions ",unions);
        return response.send({
            message : "Found",
            data : unions
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


const getIspsOfUnion= async (request, response) => {
    
    let union_id = request.body.union_id;
   

    if(!union_id){
        return response.send({
            message : "Not found",
            data : []
        })
    }
    try{
       
  
        let contracts = await Contract.find({
            union_id,
            user_type : 0
        });

       
        if(!contracts || contracts.length === 0){
      
            return response.send({
                message : "Not found",
                data : []
            })
        }

        //console.log(contracts);
        let allIsps = await ISP.find();
        let isps = allIsps.filter((allIsp) => contracts.map((contract) => contract.isp_id.toString()).includes(allIsp._id.toString()) );
        
        if(isps.length > 0){
            isps = isps.sort((a,b) => b.average_rating - a.average_rating )
        }
        //console.log("Unions ",unions);
        return response.send({
            message : "Found",
            data : isps
        })
    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


const getContracts = async (request, response) => {
    
    try{
       
  
        let contracts = await Contract.find({
            user_type : 0
        });

       
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

    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}



const getUserContracts = async (request, response) => {
    
    try{
       
  
        let contracts = await Contract.find({
            user_type : 1
        });

       
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

    } catch(e){
        return response.send({
            message : "EXCEPTION",
            data : []
        })
    }
}


const getISPSorted = async (request, response) => {
    //console.log("called");
    let sortByDistrict = request.body.district_id;
    let sortByDivision = request.body.division_id;
    let sortBySubDistrict = request.body.upazilla_id;
    let sortByUnion = request.body.union_id;
    let connection_status = request.body.connection_status;
    console.log("District :", sortByDistrict);
    console.log("Division :", sortByDivision);
    console.log("SubDistrict :", sortBySubDistrict);
    console.log("Union :", sortByUnion);
    console.log("Connection status : ", connection_status);

    try{
        let isps=[];
        let ispList= await ISP.find();

        if(sortByUnion){
            

            let contracts = await Contract.find({
                user_type : 0,
                union_id : sortByUnion
            })
            if(!contracts || contracts.length === 0){
                return response.send({
                    message : "No ISP Found",
                    data : []
                })
            }
            let ispIDList = contracts.map((contract) => contract.isp_id);

            for(let i=0; i < ispList.length; i++){
                //console.log(ispList[i]._id);
                for(let j = 0; j < ispIDList.length; j++){
                    if(ispIDList[j].toString() === ispList[i]._id.toString()){
                         isps.push(ispList[i]);
                         break;
                    }
                }
            }

        } else if(sortBySubDistrict){

            let unions = await findUnionFromSubDistrict(sortBySubDistrict);
            let contracts = await Contract.find({
                user_type : 0,
                union_id : { "$in": unions.map(union => union.union_id) }
            })
            if(!contracts || contracts.length === 0){
                return response.send({
                    message : "No ISP Found",
                    data : []
                })
            }
            let ispIDList = contracts.map((contract) => contract.isp_id);

            for(let i=0; i < ispList.length; i++){
                //console.log(ispList[i]._id);
                for(let j = 0; j < ispIDList.length; j++){
                    if(ispIDList[j].toString() === ispList[i]._id.toString()){
                         isps.push(ispList[i]);
                         break;
                    }
                }
            }
           

        } else if(sortByDistrict){

            let unions = await findUnionFromDistrict(sortByDistrict);
            
            let contracts = await Contract.find({
                user_type : 0,
                union_id : { "$in": unions.map(union => union.union_id) }
            })
            if(!contracts || contracts.length === 0){
                return response.send({
                    message : "No ISP Found",
                    data : []
                })
            }
            let ispIDList = contracts.map((contract) => contract.isp_id);
            

            for(let i=0; i < ispList.length; i++){
                //console.log(ispList[i]._id);
                for(let j = 0; j < ispIDList.length; j++){
                    if(ispIDList[j].toString() === ispList[i]._id.toString()){
                         isps.push(ispList[i]);
                         break;
                    }
                }
            }

        } else if(sortByDivision){
        
            let unions = await findUnionFromDivision(sortByDivision);
           
            let contracts = await Contract.find({
                user_type : 0,
                union_id : { "$in": unions.map(union => union.union_id) }
            })
           
            if(!contracts || contracts.length === 0){
                return response.send({
                    message : "No ISP Found",
                    data : []
                })
            }
            let ispIDList = contracts.map((contract) => contract.isp_id);
           
           for(let i=0; i < ispList.length; i++){
              
               for(let j = 0; j < ispIDList.length; j++){
                   if(ispIDList[j].toString() === ispList[i]._id.toString()){
                        isps.push(ispList[i]);
                        break;
                   }
               }
           }
      

        }

        if(!isps || isps.length === 0){
            if(sortByDistrict || sortByDivision || sortBySubDistrict || sortByUnion){
                //empty
                return response.send({
                    message : "No ISP Found",
                    data : []
                })
            } else {
             
                isps = await ISP.find();
         
            }
        }

        if(!isps || isps.length === 0){
            return response.send({
                message : "No ISP Found",
                data : []
            })
        }
        
        if(connection_status !== undefined){
            if(connection_status === "1"){
                //connected
                isps = isps.filter((isp)=> isp.connection_status === true);
            } else if(connection_status === "0"){
                //disconnected
                isps = isps.filter((isp)=> isp.connection_status === false && isp.connection_establishment_time !== null);
            } else if(connection_status === "-1"){
                //not connected
                isps = isps.filter((isp)=> isp.connection_status === false && isp.connection_establishment_time === null);
            } 
            
        }

        console.log(isps);

       
        

       
        return response.status(200).send({
            message : "ISPs Found",
            data : isps
        })
    } catch (e) {
        return response.send({
            message : e.message,
            data : []
        })
    }

    

}



module.exports = {
    findUnionFromSubDistrict,
    findUnionFromDistrict,
    findUnionFromDivision,
    findAreaFromDistrict,
    findAreaFromDivision,
    findAreaFromSubDistrict,
    findAreaFromUnion,
    findSubDistrictFromDivision,
    getISP,
    getISPSorted,
    getArea,
    getUnion,
    getIspPackage,
    getUserPackage,
    getUser,
    getDistrict,
    getDivision,
    getSubDistrict,
    getUnionOfISP,
    getIspsOfUnion,
    getIspsOfUpazilla,
    getIspsOfDistrict,
    getIspsOfDivision,
    getContracts,
    getUserContracts,
    getUnionFromArea,
    getRatingFromISP,
    getNTTN, postNTTN,
    getAllLocationData,
    postISP
}