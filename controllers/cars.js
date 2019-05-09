const { validationResult } = require('express-validator/check');
const { Car } = require('../models/car');
const { Client } = require('../models/client');

exports.getCars = (req, res, next) => {
    Car.find()
        .then(cars => {
            res.status(200).json({
                message: 'Fetch cars successfully',
                cars: cars
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createCar = (req, res, next) => {
    const errors = validationResult(req);
    const client = req.params.clientId;

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        console.log(req.body)
        error.statusCode = 422;
        throw error;
    }
    if (!client) {
        const error = new Error('No client provided.');
        error.statusCode = 422
        throw error;
    } 

    const manufacture = req.body.manufacture;
    const model = req.body.model;
    const serialNumber = req.body.serialNumber;
    const year = req.body.year;
    const licencePlate = req.body.licencePlate;
    const currentKilometers = req.body.currentKilometers;
    let carOwner;

    const car = new Car({
        manufacture: manufacture,
        model: model,
        serialNumber: serialNumber,
        year: year,
        licencePlate: licencePlate,
        currentKilometers: currentKilometers,
        owner: client
    });

    car
        .save()
        .then( () => {
            return Client.findById(client);
        })
        .then(client => {
            carOwner = client;
            client.cars.push(car);
            return client.save();
        })
        .then( () => {
            res.status(201).json({
                message: 'Car created successfully',
                car: car,
                carOwner: { _id: carOwner._id, name: carOwner.name }
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.getCarWithId = (req, res, next) => {
    const carId = req.params.carId;
    Car.findById(carId)
        .then(car => {
            if (!car) {
                const error = new Error('Could not find the car.');
                error.statusCode = 404;
                throw error
            }
            res.status(200).json({ message: 'Car fetched', car: car });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateCar = (req, res, next) => {
    const carId = req.params.carId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    const manufacture = req.body.manufacture;
    const model = req.body.model;
    const serialNumber = req.body.serialNumber;
    const year = req.body.year;
    const licencePlate = req.body.licencePlate;
    const currentKilometers = req.body.currentKilometers;

    Car.findById(carId)
        .then(car => {
            if (!car) {
                const error = new Error('Could not find the car.');
                error.statusCode = 404;
                throw error
            }
            car.manufacture = manufacture;
            car.model = model;
            car.serialNumber = serialNumber;
            car.year = year;
            car.licencePlate = licencePlate;
            car.currentKilometers = currentKilometers;

            return car.save();
            
        })
        .then(result => {
            res.status(200).json({
                message: 'Post updated',
                car: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    Car.findById(carId)
        .then(car => {
            if (!car) {
                const error = new Error('Could not find the car.');
                error.statusCode = 404;
                throw error
            }
        })
        return Car.findByIdAndRemove(carId)
        .then(result => {
            return Client.findById(result.owner)
        })
        .then(client => {
            client.cars.pull(carId);
            return client.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Deleted post'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};