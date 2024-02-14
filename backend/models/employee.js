import mongoose from "mongoose";
const employeeSchema = mongoose.Schema({
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
});
export const Employee = mongoose.model('Employee', employeeSchema);