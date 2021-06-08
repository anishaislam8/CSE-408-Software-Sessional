const router = require('express').Router();
const userFeedbackController = require('../controller/userFeedbackController');


// manage routes

// write feedbacks for isp
router.post('/feedbacks', userFeedbackController.handlePostFeedbacks);


module.exports = router;