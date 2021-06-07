const router = require('express').Router();
const nttnController = require('./../controller/nttnController');


// manage routes

// fetch the reports of all the isps
router.get('/reports', nttnController.handleReportFetching);

// fetch the reports sorted by
router.post('/reports/sortBy', nttnController.handleReportFetchingSorted);

/** 
// view a particular report
router.post('/reports/view', nttnController.handleOneReport);

// set report status to solved and report solving time to current time
router.post('/reports/solved', nttnController.handleSolvedReport);

*/

module.exports = router;