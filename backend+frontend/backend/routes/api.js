const router = require('express').Router();
const apiController = require('./../controller/apiController');
const loginController = require('./../controller/loginController');
const apiRegistrationController = require('./../controller/apiRegistrationController');

// get all isps
router.get('/isp', apiController.getISP);

// get all nttn
router.get('/nttn', apiController.getNTTN);

// post nttn
router.post('/nttn', apiController.postNTTN);

// get isp sorted
router.post('/isp/sortBy', apiController.getISPSorted);

// get all districts
router.get('/district', apiController.getDistrict);

// get all subdistricts
router.get('/subdistrict', apiController.getSubDistrict);

// get all divisions
router.get('/division', apiController.getDivision);

// get all unions
router.get('/union', apiController.getUnion);

// get all areas
router.get('/area', apiController.getArea);

// get all isp packages
router.get('/ispPackage', apiController.getIspPackage);

// get all user packages
router.get('/userPackage', apiController.getUserPackage);

// get all users
router.get('/user', apiController.getUser);

//get unions of ISP
router.post('/isp/unions', apiController.getUnionOfISP);

//get all isp contracts
router.get('/ispContracts', apiController.getContracts);

//get all isps from a union
router.post('/ispsOfUnion', apiController.getIspsOfUnion);

//get all isps from a upazilla
router.post('/ispsOfUpazilla', apiController.getIspsOfUpazilla);

//get all isps from a district
router.post('/ispsOfDistrict', apiController.getIspsOfDistrict);

//get all isps from a division
router.post('/ispsOfDivision', apiController.getIspsOfDivision);

//get all user contracts
router.get('/userContracts', apiController.getUserContracts);

//get hashed password
router.post('/hashedPass', loginController.getHashedPassword);


// register isp
router.post('/registerISP', apiRegistrationController.registerISP);

// register user
router.post('/registerUser', apiRegistrationController.registerUser);






module.exports = router;
