const router = require('express').Router();
const nttnReportController = require('../controller/nttnReportController');


// manage routes

// fetch the reports of all the isps
router.get('/reports', nttnReportController.handleReportFetching);

// fetch the reports sorted by
router.post('/reports/sortBy', nttnReportController.handleReportFetchingSorted);


// view a particular report
router.post('/reports/view', nttnReportController.handleOneReport);


// set report status to solved and report solving time to current time
router.post('/reports/solve', nttnReportController.handleSolvedReport);


module.exports = router;