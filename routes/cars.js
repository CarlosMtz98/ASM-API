const carsController = require('../controllers/cars');
const { body } = require('express-validator/check');
const express = require('express');
const router = express.Router();

// GET
router.get('/', carsController.getCars);

// POST
router.post('/new-car-for/:clientId', [
    body('manufacture')
        .trim()
        .isLength({ min: 1 }),
    body('model')
        .trim()
        .isLength({ min: 1 }),
    body('serialNumber')
        .trim()
        .isLength({ min: 1 }),
    body('year')
        .trim()
        .isLength({ min: 1 }),
    body('licencePlate')
        .trim()
        .isLength({ min: 1 }),
    body('currentKilometers')
        .trim()
        .isLength({ min: 1 })
        
    ], carsController.createCar
);

// READ
router.get('/:carId', carsController.getCarWithId)

// UPDATE 
router.put('/edit-car/:carId', [
    body('manufacture')
        .trim()
        .isLength({ min: 1 }),
    body('model')
        .trim()
        .isLength({ min: 1 }),
    body('serialNumber')
        .trim()
        .isLength({ min: 1 }),
    body('year')
        .trim()
        .isLength({ min: 1 }),
    body('licencePlate')
        .trim()
        .isLength({ min: 1 }),
    body('currentKilometers')
        .trim()
        .isLength({ min: 1 })
        
    ], carsController.updateCar
);

// DELETE
router.delete('/:carId', carsController.deleteCar);

// Exports 
module.exports = router;