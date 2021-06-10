//let { ISP } = require("../model/ISP");
let { Payment } = require("../models/Payment");

//insert an entry in Payment table
const handlePaying = async (request, response) => {
  try {
    let user_type = 0;
    let isp_id = request.body.isp_id;
    let union_id = request.body.union_id;
    let package_id = request.body.package_id;
    let payment_status = false;
    let payment_time = new Date();
    let gateway = request.body.gateway;
    let transaction_id = request.body.transaction_id;

    let newPayment = new Payment({
      user_type,
      isp_id,
      union_id,
      package_id,
      payment_status,
      payment_time,
      gateway,
      transaction_id,
    });

    let data = await newPayment.save();

    if (data.nInserted === 0) {
      return response.status(400).send({
        message: "Insertion Failed",
        data: [],
      });
    }

    return response.status(200).send({
      message: "Insertion Successful",
      data,
    });
  } catch (e) {
    return response.status(500).send({
      message: e.message,
      data: [],
    });
  }
};

module.exports = { handlePaying };
