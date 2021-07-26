const router = require('express').Router();
const ispReportController = require('../controller/ispReportController');
const ispFeedbackController = require('./../controller/ispFeedbackController');
const ispRequestController = require('./../controller/ispRequestController');
const ispGivePayment = require('../controller/ispGivePayment');

// manage routes


// isp -user

// fetch the reports of all the users
router.post('/userReports', ispReportController.viewUserReports);

// fetch the reports of users sorted by
router.post('/userReports/sortBy', ispReportController.handleReportFetchingSortedUser);

/** 
// view a particular report
router.post('/reports/view', ispController.handleOneReport);

*/
// set report status to solved and report solving time to current time
router.post('/reports/solve', ispReportController.handleSolvedReport);



// view the feedbacks of users
router.post('/feedbacks', ispFeedbackController.handleFeedbacks);

// sort the feedbacks based on district, division, subdistrict, union, area, isp
router.post('/feedbacks/sortBy', ispFeedbackController.handleFeedbackSorted);

//edit isp pass
router.post('/edit', ispRequestController.handleEditProfile)




// isp-superuser

// report to the superuser
router.post('/reports', ispReportController.handleReporting);

// report to the superuser sorted
router.post('/reports/sortBy', ispReportController.handleReportFetchingSorted);

// view own reports
router.post('/reports/view', ispReportController.viewOwnReports);


//get pending requests
router.post('/pending', ispRequestController.handlePending);
router.post('/pendings/sortBy', ispRequestController.handlePendingFetchingSorted);

// give payment to nttn
router.post("/payments", ispGivePayment.handlePaying);

// get user connection requests
router.post('/connections', ispRequestController.handleConnection);
router.post('/connections/sortBy', ispRequestController.handleConnectionFetchingSorted);



module.exports = router;