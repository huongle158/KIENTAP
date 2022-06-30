const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
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

var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');

app.get('/', (req, res) =>{
    res.send('OK')
})
app.use('/admin', adminRoutes);
app.use('/user', userRoutes)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})