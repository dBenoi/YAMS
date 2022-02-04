const express = require('express');
const app = express();
const path = require('path');
const { Asset, Client } = require('./models/asset');
const methodOverride = require('method-override');
const morgan = require('morgan');
const engine = require('ejs-mate');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assetDBtest')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected');
})

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.render('home')
})

const clients = ['SBPHTD', 'PPHTD', 'POSLA']

//get request for new asset form
app.get('/assets/newDevice', (req, res) => {
    res.render('assets/newDevice')
})

app.get('/assets/clientList', (req, res) => {
    res.render('assets/clientList')
})

//render sbphtd asset list
app.get('/assets/clients/sbphtd', async (req, res) => {
    const title = await Asset.findOne({ 'client': 'SBPHTD' });
    const assets = await Asset.find({ 'client': 'SBPHTD' }).sort({ ipAddress: 1 }).collation({ locale: "en_US", numericOrdering: true });
    res.render('assets/clients', { assets, title })
})

app.get('/assets/clients/pphtd', async (req, res) => {
    const assets = await Asset.find({ 'client': 'PPHTD' }).sort({ ipAddress: 1 }).collation({ locale: "en_US", numericOrdering: true });
    res.render('assets/clients', { assets })
})

app.get('/assets/clients/posla', async (req, res) => {
    const title = await Asset.findOne({ 'client': 'POSLA' });
    const assets = await Asset.find({ 'client': 'POSLA' }).sort({ ipAddress: 1 }).collation({ locale: "en_US", numericOrdering: true });
    res.render('assets/clients', { assets, title })
})

//post request to submit form
app.post('/assets', async (req, res) => {
    const asset = new Asset(req.body.asset);
    await asset.save();
    res.redirect('/')
})

//show all assets
app.get('/assets/:id', async (req, res) => {
    const { id } = req.params;
    const asset = await Asset.findById(id);
    res.render('assets/show', { asset })
})

//display edit asset form
app.get('/assets/:id/edit', async (req, res) => {
    const { id } = req.params;
    const asset = await Asset.findById(id);
    res.render('assets/edit', { asset, clients })
})


app.put('/assets/:id', async (req, res) => {
    const { id } = req.params;
    const asset = await Asset.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect(`/assets/${asset._id}`)
})

app.delete('/assets/:id', async (req, res) => {
    const { id } = req.params;
    const deletedAsset = await Asset.findByIdAndDelete(id)
    res.redirect('/assets/show')
})

//base code for new Client lists
// app.get('/assets/clients', async (req, res) => {
//     const assets = await Asset.find({ 'client': 'SBPHTD' });
//     res.render('assets/clients', { assets })
// })

// app.get('/locations/:id', async (req, res) => {
//     const campground = await Campground.findById(req.params.id)
//     res.render('campgrounds/show', { campground })
// })






app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})