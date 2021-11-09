const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGODB_URI;

mongoose
    .connect(URL)
    .then(() => console.log('connected'))
    .catch((err) => console.error(err));