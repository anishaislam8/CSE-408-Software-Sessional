const router = require("express").Router();
const userFeedbackController = require("../controller/userFeedbackController");

const userGivePayment = require("../controller/userGivePayment");
// manage routes

// write feedbacks for isp
router.post("/feedbacks", userFeedbackController.handlePostFeedbacks);

// give payment to ISP
router.post("/payments", userGivePayment.handlePaying);

module.exports = router;
