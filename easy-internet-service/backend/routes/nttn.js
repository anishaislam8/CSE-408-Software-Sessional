const router = require('express').Router();
const nttnReportController = require('../controller/nttnReportController');
const nttnFeedbackController = require('../controller/nttnFeedbackController');


// manage routes

// fetch the reports of all the isps
router.get('/reports', nttnReportController.handleReportFetching);

// fetch the reports sorted by
router.post('/reports/sortBy', nttnReportController.handleReportFetchingSorted);

// view a particular report
router.post('/reports/view', nttnReportController.handleOneReport);

// set report status to solved and report solving time to current time
router.post('/reports/solve', nttnReportController.handleSolvedReport);

// view the feedbacks of users
router.get('/feedbacks', nttnFeedbackController.handleFeedbacks);

// view a particular feedback
router.post('/feedbacks/view', nttnFeedbackController.handleOneFeedback);

// sort the feedbacks based on district, division, subdistrict, union, area, isp
router.post('/feedbacks/sortedBy', nttnFeedbackController.handleFeedbackSorted);


module.exports = router;