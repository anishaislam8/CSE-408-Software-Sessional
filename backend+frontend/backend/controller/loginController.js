
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const getHashedPassword = async (request, response) => {

    let passwordEnteredByUser = request.body.entered;
    let hash = request.body.saved;

    bcrypt.compare(passwordEnteredByUser, hash, function(err, isMatch) {
        if (err) {
            return response.send({
                message : e.message,
                data : []
            })
        } else if (!isMatch) {
            return response.send({
                message : "Not Matched",
                data : []
            })
        } else {
            return response.send({
                message : "Matched",
                data : hash
            })
        }
      })
}


module.exports = {
    getHashedPassword
}