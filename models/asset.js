const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    ipAddress: {
        type: String,
        required: true
    },
    image: String,
    deviceUrl: String,
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
    longitude: String,
    latitude: String,
    notes: String

});

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    lastMaint: String
});

const Asset = mongoose.model('assets', assetSchema);
const Client = mongoose.model('clients', clientSchema);

module.exports = {
    Asset, Client
}