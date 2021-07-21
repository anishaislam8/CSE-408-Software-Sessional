const router = require('express').Router();
const userFeedbackController = require('../controller/userFeedbackController');
const userReportController =require('../controller/userReportController');

// manage routes

// write feedbacks for isp
router.post('/feedbacks', userFeedbackController.handlePostFeedbacks);

// view the feedbacks 
router.post('/feedbacks/view', userFeedbackController.handleFeedbacks);

// sort the feedbacks based on district, division, subdistrict, union, area, isp
router.post('/feedbacks/sortBy', userFeedbackController.handleFeedbackSorted);


// report to the isp
router.post('/reports', userReportController.handleReporting);

// report to the isp sorted
router.post('/reports/sortBy', userReportController.handleReportFetchingSortedUser);

// view own reports
router.post('/reports/view', userReportController.viewOwnReports);


module.exports = router;