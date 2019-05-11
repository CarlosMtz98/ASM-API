const { validationResult } = require('express-validator/check');
const { Client } = require('../models/client');

exports.getClients = (req, res, next) => {
    Client.find()
        .then(clients => {
            res.status(200).json({
                message: 'Fetch post successfully',
                clients: clients
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createClient = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        error.statusCode = 422;
        console.log(req);
        throw error;
    }
    const name = req.body.name;
    const surnames = req.body.surnames;
    const email = req.body.email;
    const phone = req.body.phone;
    const adress = req.body.adress;
    const cars = []
    const client = new Client({
        name: name,
        surnames: surnames,
        email: email,
        phone: phone,
        adress: adress,
        cars: cars,
    });
    
    client
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post created succesfully!',
                client: client,
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getClient = (req, res, next) => {
    const clientId = req.params.clientId;
    Client.findById(clientId)
        .then(client => {
            if (!client) {
                const error = new Error('Could not find the client');
                error.statusCode = 404;
                throw error
            }
            res.status(200).json({
                message: 'Client fetched',
                client: client
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}   

exports.updatePost = (req, res, next) => {
    const clientId = req.params.clientId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const surnames = req.body.surnames;
    const email = req.body.email;
    const phone = req.body.phone;
    const adress = req.body.adress;
    const cars = req.body.cars;

    Client.findById(clientId)
        .then(client => {
            if (!client) {
                const error = new Error('Coul not find the client')
                error.statusCode = 404;
                throw error
            }
            if (cars != null) {
                client.cars = cars
            }

            client.name = name;
            client.surnames = surnames;
            client.email = email;
            client.phone = phone;
            client.adress = adress;
            
            return client.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Client updated',
                client: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    Client.findById(clientId)
        .then(client => {
            if (!client) {
                const error = new Error('Could not find client.');
                error.statusCode = 404;
                throw error
            }
            return Client.findByIdAndRemove(clientId)
        })
        .then(result => {
            res.status(200).json({
                message: 'Deleted client',
                client: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}  