const employeesController = require('../controllers/employees');
const { body } = require('express-validator/check');
const express = require('express');
const router = express.Router();

const { Employee } = require('../models/employee');

// GET
router.get('/', employeesController.getEmployees);

// POST
router.post('/new', [
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('surnames')
        .trim()
        .not()
        .isEmpty(),
    body('genre')
        .trim()
        .not()
        .isEmpty(),
    body('birthDate')
        .trim()
        .not()
        .isEmpty(),
    body('rfc')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a valid RFC')
        .custom((value, { req }) => {
            return Employee.findOne({
                rfc: value
            })
            .then(employeeDoc => {
                if (employeeDoc) {
                    return Promise.reject('RFC already registered!');
                }
            })
        }),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid Email')
        .custom((value, { req }) => {
            return Employee.findOne({
                email: value
            })
            .then(employeeDoc => {
                if (employeeDoc) {
                    return Promise.reject('Email already exists!');
                }
            })
        })
        .normalizeEmail(),
    body('phone')
        .trim()
        .not()
        .isEmpty()

    ],employeesController.createEmployee
);

// READ
router.get('/:employeeId', employeesController.getEmployee);

// UPDATE
router.put('/update/:employeeId', employeesController.updateEmployee);

// DELETE
router.delete('/:employeeId', employeesController.deleteEmployee);

module.exports = router;