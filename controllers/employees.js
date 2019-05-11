const { validationResult } = require('express-validator/check');
const { Employee } = require('../models/employee');

exports.getEmployees = (req,res, next) => {
    let totalItems;
    Employee.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Employee.find()
        })
        .then(employees => {
            res.status(200).json({
               message: 'Fetch employees successfully.',
               employees: employees,
               totalItems: totalItems
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createEmployee = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        console.log(errors);
        error.statusCode = 422;
        throw error;
    }
    const employee = new Employee({
        name: req.body.name,
        surenames: req.body.surenames,
        birthDate: req.body.birthDate,
        genre: req.body.genre,
        rfc: req.body.rfc,
        email: req.body.email,
        phone: req.body.phone,
        adress: req.body.adress,
        position: req.body.position,
        specialties: req.body.specialties,
        paysheet: req.body.paysheet
    });

    employee.save()
        .then(result => {
           res.status(201).json({
                message: 'Employee created successfully',
                employee: employee,
           }); 
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });        
}

exports.getEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId)
        .then(employee => {
            if (!employee) {
                const error = new Error('Could not find employee.');
                error.statusCode = 404;
                throw error
            }
            res.status(200).json({ message: 'Employee fetched.', employee: employee})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    Employee.findById(employeeId)
        .then(employee => {
            if (!employee) {
                const error = new Error('Could not find employee.');
                error.statusCode = 404;
                throw error
            }
            employee.name = req.body.name;
            employee.surenames = req.body.surenames;
            employee.birthDate = req.body.birthDate;
            employee.genre = req.body.genre;
            employee.rfc = req.body.rfc;
            employee.email = req.body.email;
            employee.phone = req.body.phone;
            employee.adress = req.body.adress;
            employee.position = req.body.position;
            employee.specialties = req.body.specialties;
            employee.paysheet = req.body.paysheet;

            return employee.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Employee updated.',
                employee: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deleteEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId;

    Employee.findById(employeeId)
        .then(employee => {
            if (!employee) {
                const error = new Error('Could not find employee.');
                error.statusCode = 404;
                throw error
            }
            return Employee.findByIdAndRemove(employeeId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Employee deleted.'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}