const path = require('path');
const { Asset, Client } = require('../models/asset');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assetDBtest')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected');
});

const seedDB = async () => {
    const asset = new Asset({
        ipAddress: '192.168.224.1',
        location: 'Admin',
        client: 'POSLA',
        deviceType: 'router',
        model: 'Dell Sonicwall'
    });
    const client = new Client({
        name: 'St. Bernard',
        description: 'St. Bernard Description',
        address: 'St. Bernard Address',
        network: '192.168.0.X'

    });
    await asset.save();
    await client.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})