const express = require('express');
var router = express.Router();
var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => Employee.find()
    .then((docs) => res.send(docs))
    .catch((err) => console.log('Failed to find all employees: ' + JSON.stringify(err)))
);

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with id: ' + req.params.id);
    else
        Employee.findById(req.params.id)
            .then((doc) => res.send(doc))
            .catch((err) => console.log('Failed to find employee with id: ' + req.params.id + ' ' + JSON.stringify(err)));
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save()
        .then((doc) => res.send(doc))
        .catch((err) => console.log('Failed to save employee: ' + JSON.stringify(err)));
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with id: ' + req.params.id);
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
        .then((doc) => res.send(doc))
        .catch((err) => console.log('Failed to save employee: ' + JSON.stringify(err)));
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with id: ' + req.params.id);
    else
        Employee.findByIdAndDelete(req.params.id)
            .then((doc) => res.send(doc))
            .catch((err) => console.log('Failed to delete employee with id: ' + req.params.id + ' ' + JSON.stringify(err)));
});;
module.exports = router;