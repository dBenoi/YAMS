const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    ipAddress: {
        type: String,
        required: true
    },
    imageLink: String,
    deviceType: String,
    description: String,
    model: String,
    attachedSwitch: String,
    portNumber: Number,
    macAddress: String,
    serial: String,
    client: {
        type: String,
        required: true
    },
    location: String,
    notes: String

})

module.exports = mongoose.model('Asset', assetSchema)
