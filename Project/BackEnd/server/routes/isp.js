const router = require("express").Router();
const ispReportController = require("../controller/ispReportController");
const ispGivePayment = require("../controller/ispGivePayment");

const ispReceivePayment = require("../controller/ispReceivePayment");
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
router.post("/reports", ispReportController.handleReporting);

// give payment to nttn
router.post("/payments", ispGivePayment.handlePaying);

// fetch new payments from users
router.get("/payments", ispReceivePayment.findNewPayment);

// set payment status to solved and solving time to current time
router.post("/payments/resolve", ispReceivePayment.handlePaymentDone);

module.exports = router;
