const router = require('express').Router();
const ispReportController = require('../controller/ispReportController');
const ispFeedbackController = require('./../controller/ispFeedbackController');

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

// view the feedbacks of users
router.post('/feedbacks', ispFeedbackController.handleFeedbacks);

// sort the feedbacks based on district, division, subdistrict, union, area, isp
router.post('/feedbacks/sortBy', ispFeedbackController.handleFeedbackSorted);




// isp-superuser

// report to the superuser
router.post('/reports', ispReportController.handleReporting);

// report to the superuser sorted
router.post('/reports/sortBy', ispReportController.handleReportFetchingSorted);

// view own reports
router.post('/reports/view', ispReportController.viewOwnReports);

module.exports = router;