import { Employee } from '../models/employee.js';
import Express from "express";
import { ObjectId } from "mongodb"
var router = Express.Router();

router.get('/', async (req, res) => {
    try {
        Employee.find()
            .then((docs) => res.send(docs))
            .catch((err) => console.log('Failed to find all employees: ' + JSON.stringify(err)))
    }
    catch (error) {
        response.status(500);
        console.log(error.message).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record found with id: ' + req.params.id);
        else
            Employee.findById(req.params.id)
                .then((doc) => res.send(doc))
                .catch((err) => console.log('Failed to find employee with id: ' + req.params.id + ' ' + JSON.stringify(err)));
    }
    catch (error) {
        response.status(500);
        console.log(error.message).send({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        var emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });
        emp.save()
            .then((doc) => res.send(doc))
            .catch((err) => console.log('Failed to save employee: ' + JSON.stringify(err)));
    }
    catch (error) {
        response.status(500);
        console.log(error.message).send({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
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
    }
    catch (error) {
        response.status(500);
        console.log(error.message).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record found with id: ' + req.params.id);
        else
            Employee.findByIdAndDelete(req.params.id)
                .then((doc) => res.send(doc))
                .catch((err) => console.log('Failed to delete employee with id: ' + req.params.id + ' ' + JSON.stringify(err)));
    }
    catch (error) {
        response.status(500);
        console.log(error.message).send({ message: error.message });
    }
});

export const EmployeeController = router;