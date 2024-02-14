import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import bodyParser from "body-parser";
import { EmployeeController } from './controllers/employeeController.js'
import mongoose from "mongoose";
var app = express();
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use('/employees', EmployeeController);

mongoose.connect(mongoDBURL)
    .then(() => console.log('MongoDB connection successful!'))
    .catch((err) => console.log('Failed to connect to MongoDB: ' + JSON.stringify(err)));
