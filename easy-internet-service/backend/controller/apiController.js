const { District } = require('./../models/District');
const { Division } = require('./../models/Division');
const { SubDistrict } = require('./../models/Subdistrict');
const { Union } = require('./../models/Union');
const { Area } = require('./../models/Area');

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



module.exports = {
    findUnionFromSubDistrict,
    findUnionFromDistrict,
    findUnionFromDivision,
    findAreaFromDistrict,
    findAreaFromDivision,
    findAreaFromSubDistrict,
    findAreaFromUnion
}