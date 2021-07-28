let { Payment } = require("../models/Payment");
let { ISP } = require("../models/ISP");
let { Package } = require("../models/Package");
let { Contract } = require("../models/Contract");

const findNewPayment = async (request, response) => {
  //   let status = request.body.payment_status;
  //   let type = request.body.user_type;

  try {
    let payments;
    //if (type === 0 && status === false) {
    payments = await Payment.find({
      user_type: 0,
    }).sort({ payment_time: 1 }); // 1- ascending, -1 : descending
    //}
    if (!payments || payments.length === 0) {
      return response.send({
        message: "No New Payment Found",
        data: [],
      });
    }

    return response.status(200).send({
      message: "New Payment Found",
      data: payments,
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
    // if (
    //   !payment ||
    //   payment.user_type !== 0 ||
    //   payment.payment_status === true
    // ) {
    //   return response.status(404).send({
    //     message: "New payment not found",
    //     data: [],
    //   });
    // }
    let isp = await ISP.findById(payment.isp_id);
    if (!isp._id) {
      return response.status(400).send({
        message: "ISP ID invalid",
        data: [],
      });
    }
    payment.payment_status = true;
    let package = await Package.findById(payment.package_id);
    if (!package._id) {
      return response.status(400).send({
        message: "Package ID invalid",
        data: [],
      });
    }
    if (isp.connection_status === false) {
      isp.connection_status = true;
      isp.connection_establishment_time = new Date();
      isp.expiration_date = new Date() + package.duration;
    } else if (isp.connection_status === true) {
      isp.expiration_date = new Date() + package.duration;
    }

    let user_type = 0;
    let isp_id = payment.isp_id;
    let package_id = payment.package_id;
    let union_id = payment.union_id;
    let duration = package.duration;
    let current = true;

    let newContract = new Contract({
      user_type,
      isp_id,
      union_id,
      package_id,
      duration,
      current,
    });

    let data = await newContract.save();

    if (data.nInserted === 0) {
      return response.status(400).send({
        message: "Insertion Failed",
        data: [],
      });
    }

    let updatedisp = await isp.save();
    let updatedpayment = await payment.save();
    return response.status(200).send({
      message: "Contract insertion Successful and Payment and ISP updated",
      data: data + "\n" + updatedisp + "\n" + updatedpayment,
    });

    // return response.status(200).send({
    //   message: "payment updated",
    //   data: updatedpayment,
    // });
  } catch (e) {
    return response.status(500).send({
      message: "EXCEPTION",
      data: [],
    });
  }
};

module.exports = {
  findNewPayment,
  handlePaymentDone,
};
