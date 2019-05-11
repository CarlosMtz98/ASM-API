const clientsController = require('../controllers/clients');
const { body } = require('express-validator/check');
const express = require('express');
const router = express.Router();

const { Client } = require('../models/client');

// GET
router.get('/', clientsController.getClients);

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
        body('email')
            .isEmail()
            .withMessage('Please enter a valid Email')
            .custom((value, { req }) => {
                return Client.findOne({
                    email: value
                })
                .then(clientDoc => {
                    if (clientDoc) {
                        return Promise.reject('Email already exists!');
                    }
                })
            })
            .normalizeEmail(),
        body('phone')
            .trim()
            .not()
            .isEmpty(),
        body('adress')
            .trim()
            .not()
            .isEmpty()
    ],
    clientsController.createClient
);

// READ
router.get('/:clientId', clientsController.getClient);

// UPDATE 
router.put('/edit/:clientId', [
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('surnames')
        .trim()
        .not()
        .isEmpty(),
    body('phone')
        .trim()
        .not()
        .isEmpty(),
    body('adress')
        .trim()
        .not()
        .isEmpty()
    ],
    clientsController.updatePost
);

// DELETE
router.delete('/:clientId', clientsController.deleteClient);


module.exports = router;