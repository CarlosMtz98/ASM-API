const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();

const {User} = require('../models/user');

router.put('/signup', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid Email')
            .custom((value, { req }) => {
                return User.findOne({
                    email: value
                })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists!');
                    }
                })
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5}),
        body('name')
            .trim()
            .not()
            .isEmpty()

    ], authController.signup
);

router.post('/login', authController.login);

module.exports = router;