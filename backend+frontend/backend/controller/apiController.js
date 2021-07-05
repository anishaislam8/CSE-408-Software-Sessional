const { District } = require('./../models/District');
const { Division } = require('./../models/Division');
const { SubDistrict } = require('./../models/Subdistrict');
const { Union } = require('./../models/Union');
const { Area } = require('./../models/Area');
const { ISP } = require('./../models/ISP');
const { User } = require('./../models/User');
const { Package } = require('./../models/Package');
const { Contract } = require('../models/Contract');


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



const getPackage = async (request, response) => {
   
    try{
        let package = await Package.find();
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
            return response.status(404).send({
                message : "Not found",
                data : []
            })
        }
        response.status(200).send({
            message : "Found",
            data : user
        })
    } catch (e) {
        return response.status(500).send({
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
   //console.log(sortByDivision);

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

        if(!isps){
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
            console.log("Hi");
            isps = isps.filter((isp)=> isp.connection_status === connection_status);
        }

       
        

       
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
    getPackage,
    getUser,
    getDistrict,
    getDivision,
    getSubDistrict
}