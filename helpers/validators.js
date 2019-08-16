const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

// check to make sure the id is a valid mongoose object id
module.exports.validateObjectId = id => {
    return mongoose.Types.ObjectId.isValid(id);
}

// return any error messages from checking requests
module.exports.hasValidationErrors = (req) => {
    let errorMsg = '';
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length) {
        errorMsg = errors[0].msg;
        console.log(errorMsg);
    }
    return errorMsg;
}