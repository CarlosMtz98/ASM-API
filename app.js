const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

const startupRoutes = require('./routes/startup');
const authRoutes = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const carsRoutes = require('./routes/cars');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' +file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect('mongodb://localhost/rest-api')
    .then(() => console.log('Connected to MongoDB..'))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', startupRoutes);
app.use('/clients', clientsRoutes);
app.use('/cars', carsRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ 
        message: message, 
        data: data });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening in port: ${port}...`));

