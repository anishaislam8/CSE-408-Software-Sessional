const { District } = require('./../models/District');
const { SubDistrict } = require('./../models/Subdistrict');
const { Union } = require('./../models/Union');


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
        upazilla_id : { $in : subdistricts }
    });

    return unions;
}

const findUnionFromDivision = async (division) => {
    let districts = await District.find({
        division_id : division
    });

    let subdistricts = await SubDistrict.find({
        district_id : { $in : districts}
    });

    let unions = await Union.find({
        upazilla_id : { $in : subdistricts }
    });

    return unions;
}



module.exports = {
    findUnionFromSubDistrict,
    findUnionFromDistrict,
    findUnionFromDivision
}