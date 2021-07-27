const router = require('express').Router();
const nttnReportController = require('../controller/nttnReportController');
const nttnFeedbackController = require('../controller/nttnFeedbackController');
const nttnRequestController = require('../controller/nttnRequestController');
const nttnAfterPaymentController = require('../controller/nttnAfterPaymentController');


// manage routes

// fetch the reports of all the isps
router.get('/reports', nttnReportController.handleReportFetching);

// fetch the solved reports of all the isps
router.get('/solvedReports', nttnReportController.handleReportFetchingSolved);

// fetch the unsolvedreports of all the isps
router.get('/unsolvedReports', nttnReportController.handleReportFetchingUnsolved);

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
router.post('/feedbacks/sortBy', nttnFeedbackController.handleFeedbackSorted);

// pending requests
router.get('/pending', nttnRequestController.handlePending);

//post pending requests
router.post('/pending', nttnRequestController.insertPending);


router.post('/pendings/sortBy', nttnRequestController.handlePendingFetchingSorted);

router.post('/renewals/sortBy', nttnRequestController.handleRenewalFetchingSorted);
// pending/notify
// router.post('/pending/notify', nttnRequestController.handlePendningNotification);

// renewal request
router.get('/renewal', nttnRequestController.handleRenewal);

// renewal/notify
// router.post('/renewal/notify', nttnrequestController.handleRenewalNotification);


// fetch all the new payments
router.get("/payments", nttnAfterPaymentController.findNewPayment);

// set payment status to solved and solving time to current time
router.post("/payments/resolve", nttnAfterPaymentController.handlePaymentDone);

// get isp connection requests
router.get('/connectionsISP', nttnRequestController.getISPConnections);
// get isp connection requests
router.post('/connections/sortBy', nttnRequestController.handleConnectionFetchingSorted);


router.post('/connections/accept', nttnRequestController.acceptConnection);

router.post('/connections/reject', nttnRequestController.rejectConnection);


module.exports = router;
