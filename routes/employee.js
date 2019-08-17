const express = require("express");
const route = express.Router();
const Employee = require("../classes/Employee");

route.get("/", async (req, res) => {
	const employees = await Employee.find().sort({ lastname: 1 });
	res.send(employees);
});

route.get("/:id", async (req, res) => {
	try {
		const result = await Employee.findById(req.params.id);
		res.send(result);
	} catch (ex) {
		console.log("Error: ", ex.message);
		res.send("Something has gone wrong.");
	}
});

route.post("/", async (req, res) => {
	try {
		const result = await new Employee(
			Employee.validateEmployee(req.body) //throws an error if invalid, else return object
		).save();
		res.send(result);
	} catch (ex) {
		console.log("Errors: ", ex.message);
		res.send("Something has gone wrong.");
	}
});

route.delete("/:id", async (req, res) => {
	try {
		const result = await Employee.findByIdAndDelete(req.params.id);
		res.send(result);
	} catch (ex) {
		console.log("Error: ", ex.message);
		res.send("Something has gone wrong.");
	}
});

route.put("/:id", async (req, res) => {
	try {
		const result = await Employee.findByIdAndUpdate(
			req.params.id,
			Employee.validateEmployee(req.body), //throws an error if invalid, else return object
			{ new: true }
		);
		res.send(result);
	} catch (ex) {
		console.log("Error: ", ex.message);
		res.send("Something has gone wrong.");
	}
});

module.exports = route;
