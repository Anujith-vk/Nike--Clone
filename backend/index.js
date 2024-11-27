require('dotenv').config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('./database/db');
const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./Routes/route');
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',  
}));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
