const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.port || 5000;

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(express.static('public'))
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connect to MONGODB');
})

var Product = require("./models/product.model");

var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');
var collectionRoutes = require('./routes/collection')
var orderRoutes = require('./routes/order');

app.get('/', (req, res) => {
    res.send('OK')
})
app.use('/admin', adminRoutes);
app.use('/user', userRoutes)
app.use('/collection', collectionRoutes)
app.use("/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})