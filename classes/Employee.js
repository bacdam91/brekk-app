const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");

const EmployeeSchema = new Schema({
	firstname: {
		type: String,
		minlength: 3,
		maxlength: 50,
		required: true
	},
	lastname: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: true
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
		required: true
	},
	position: {
		type: String,
		enum: ["Pharmacist", "Pharmacy Assistant"],
		required: true
	},
	initial: {
		type: String,
		minlength: 2,
		maxlength: 2,
		required: true,
		uppercase: true
	}
});

EmployeeSchema.statics.validateEmployee = function(employeeData) {
	const Schema = {
		firstname: Joi.string()
			.min(3)
			.max(50)
			.required(),
		lastname: Joi.string()
			.min(2)
			.max(50)
			.required(),
		gender: Joi.any()
			.valid("male", "female", "other")
			.required(),
		position: Joi.any()
			.valid("Pharmacist", "Pharmacy Assistant")
			.required(),
		initial: Joi.string()
			.min(2)
			.max(2)
			.required()
	};

	const { error } = Joi.validate(employeeData, Schema);

	if (error) throw error;

	return employeeData;
};

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
