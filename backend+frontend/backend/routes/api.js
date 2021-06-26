const router = require('express').Router();
const apiController = require('./../controller/apiController');

// get all isps
router.get('/isp', apiController.getISP);

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

// get all packages
router.get('/package', apiController.getPackage);

// get all users
router.get('/user', apiController.getUser);


module.exports = router;
