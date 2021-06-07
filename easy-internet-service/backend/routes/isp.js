const router = require('express').Router();
const ispReportController = require('../controller/ispReportController');


// manage routes

/** 
// isp -user

// fetch the reports of all the users
router.get('/reports', ispController.handleReportFetching);

// fetch the reports of users sorted by
router.post('/reports/sortBy', ispController.handleReportFetchingSorted);

// view a particular report
router.post('/reports/view', ispController.handleOneReport);

// set report status to solved and report solving time to current time
router.post('/reports/solved', ispController.handleSolvedReport);

*/

// isp-superuser

// report to the superuser
router.post('/reports', ispReportController.handleReporting);

module.exports = router;