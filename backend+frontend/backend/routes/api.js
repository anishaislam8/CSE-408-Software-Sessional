const router = require('express').Router();
const apiController = require('./../controller/apiController');

// get all isps
router.get('/isp', apiController.getISP);

// get all unions
router.get('/union', apiController.getUnion);

// get all areas
router.get('/area', apiController.getArea);

// get all packages
router.get('/package', apiController.getPackage);

module.exports = router;
