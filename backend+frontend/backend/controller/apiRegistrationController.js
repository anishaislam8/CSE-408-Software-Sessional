const { PhysicalConnectionISP } = require('./../models/PhysicalConnectionISP');
const { UserConnection } = require('./../models/UserConnection');
const { request, response } = require('express');
const { Employee } = require('../models/Employee');



const registerISP = async (request, response) => {
    const isp_name = request.body.isp_name;
    const license_number = request.body.license_number;
    const head_office_address = request.body.head_office_address;
    const head_office_telephone = request.body.head_office_telephone;
    const head_office_mobile = request.body.head_office_mobile;
    const head_office_email = request.body.head_office_email;
    const office_address = request.body.office_address;
    const office_telephone = request.body.office_telephone;
    const office_mobile = request.body.office_mobile;
    const office_email = request.body.office_email;
    const contact_person_address = request.body.contact_person_address;
    const contact_person_telephone = request.body.contact_person_telephone;
    const contact_person_mobile = request.body.contact_person_mobile;
    const contact_person_email = request.body.contact_person_email;
    const contact_person_name = request.body.contact_person_name;
    const wire_type = request.body.wire_type;
    const division_id = request.body.division_id;
    const district_id = request.body.district_id;
    const upazilla_id = request.body.upazilla_id;
    const union_id = request.body.union_id;

    try{
        let newISPConnection = new PhysicalConnectionISP({
            isp_name,
            license_number,
            head_office_address,
            head_office_telephone,
            head_office_mobile,
            head_office_email,
           
            office_address,
            office_telephone,
            office_mobile,
            office_email,
            contact_person_name,
            contact_person_address,
            contact_person_telephone,
            contact_person_mobile,
            contact_person_email,
            wire_type,
            division_id,
            district_id,
            upazilla_id,
            union_id
        })

        let newConnection = await newISPConnection.save();

        if(newConnection.nInserted === 0){
            return response.send({
                message : "Insertion Failed",
                data : []
            })
        }
        return response.status(200).send({
            message : "Insertion Successful",
            data : newConnection
        })
    }catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }
}

const addEmployee = async (request, response) => {
    let employee_type = request.body.employee_type;
    let name = request.body.name;
    let address = request.body.address;
    let nid = request.body.nid;
    let phone_number = request.body.phone_number;
    let joining_date = request.body.joining_date;
    let isp_id = request.body.isp_id || null;
	

    try{
        let newEmployee = new Employee({
            employee_type,
            name,
            address,
            nid,
            phone_number,
            joining_date,
            isp_id
        });

        let addedEmployee = await newEmployee.save();

        if(addedEmployee.nInserted === 0){
            return response.send({
                message : "Insertion Failed",
                data : []
            })
        }
        return response.status(200).send({
            message : "Insertion Successful",
            data : addedEmployee
        })

    }catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }
}

const registerUser = async (request, response) => {
    const user_name = request.body.user_name;
    const nid_number = request.body.nid_number;
    const contact_person_address = request.body.contact_person_address;
    const contact_person_telephone = request.body.contact_person_telephone;
    const contact_person_mobile = request.body.contact_person_mobile;
    const contact_person_email = request.body.contact_person_email;
    const wire_type = request.body.wire_type;
    const division_id = request.body.division_id;
    const district_id = request.body.district_id;
    const upazilla_id = request.body.upazilla_id;
    const union_id = request.body.union_id;
    const area_id = request.body.area_id;
    const isp_id = request.body.isp_id;

    try{
        let newUserConnection = new UserConnection({
            user_name,
            nid_number,
            contact_person_address,
            contact_person_telephone,
            contact_person_mobile,
            contact_person_email,
            wire_type,
            division_id,
            district_id,
            upazilla_id,
            union_id,
            area_id,
            isp_id
        })

        let newConnection = await newUserConnection.save();

        if(newConnection.nInserted === 0){
            return response.send({
                message : "Insertion Failed",
                data : []
            })
        }
        console.log("User : ", newConnection)
        return response.status(200).send({
            message : "Insertion Successful",
            data : newConnection
        })
    }catch(e){
        return response.send({
            message : e.message,
            data : []
        })
    }
}



module.exports = {
    registerISP,
    registerUser,
    addEmployee
}