let { Payment } = require("../models/Payment");
let { ISP } = require("../models/ISP");

const findNewPayment = async (response) => {
  //   let status = request.body.payment_status;
  //   let type = request.body.user_type;

  try {
    let payments;
    //if (type === 0 && status === false) {
    payments = await Payment.find({
      payment_status: false,
      user_type: 0,
    }).sort({ payment_time: -1 }); // 1- ascending, -1 : descending
    //}
    if (paymets.length === 0) {
      return response.status(404).send({
        message: "No New Payment Found",
        data: [],
      });
    }

    return response.status(200).send({
      message: "New Payment Found",
      data: [],
    });
  } catch (e) {
    return response.status(500).send({
      message: e.message,
      data: [],
    });
  }
};

const handlePaymentDone = async (request, response) => {
  let payment_id = request.body._id;
  if (!payment_id) {
    return response.status(400).send({
      message: "Payment ID invalid",
      data: [],
    });
  }
  try {
    let payment = await Payment.findById(payment_id);
    if (
      !payment ||
      payment.user_type !== 0 ||
      payment.payment_status === true
    ) {
      return response.status(404).send({
        message: "New payment not found",
        data: [],
      });
    }
    let isp = await ISP.findById(payment.isp_id);
    if (!isp._id) {
      return response.status(400).send({
        message: "ISP ID invalid",
        data: [],
      });
    }
    payment.payment_status = true;
    if (isp.connection_status === false) {
      isp.connection_status = true;
      isp.connection_establishment_time = new Date();
      isp.expiration_Date = new Date() + 90;
    }

    let updatedisp = await isp.save();
    let updatedpayment = await payment.save();
    return response.status(200).send({
      message: "payment updated",
      data: updatedpayment,
    });
  } catch (e) {
    return response.status(500).send({
      message: "EXCEPTION",
      data: [],
    });
  }
};
