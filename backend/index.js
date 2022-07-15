const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const PORT = process.env.port || 5000;

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(cors());
app.use(express.static('public'))
app.use('/images', express.static('images'));


mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connect to MONGODB');
})

var userRoutes = require('./routes/user');
var collectionRoutes = require('./routes/collection')
var orderRoutes = require('./routes/order');
var productRoutes = require('./routes/product');
var emailRoutes = require('./routes/email')


app.use('/user', userRoutes)
app.use('/collection', collectionRoutes)
app.use("/order", orderRoutes);
app.use("/product", productRoutes);
app.use("/email", emailRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})