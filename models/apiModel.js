const mongoose = require('mongoose');
const { Schema } = mongoose;
const apiSchema = new Schema({

    apiName: String,
    apiDescription: String,
    attributes: [{
        name: String,
        description: String,
        dataType: String,
        required: Boolean,
        additionalMessage: String,
    }],
    requestBaseURL: String,
    requestPath: String,
    requestMethod: String,
    requestContentType: String,
    requestBody: String,
    returnDescription: String,
    responseObject: String

})

module.exports = new mongoose.model('Api', apiSchema);