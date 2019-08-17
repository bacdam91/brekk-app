const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DB_USERNAME = config.get("db.username");
const DB_PASSWORD = config.get("db.password");
async function connectToDB() {
	try {
		const result = await mongoose.connect(
			`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@sablepharmacy-so7uj.mongodb.net/brekk?retryWrites=true&w=majority`,
			{ useNewUrlParser: true }
		);
		if (result) {
			console.log("Connected to DB...");
		}
	} catch (ex) {
		console.log("Error: ", ex.message);
	}
}

connectToDB();

app.get("/", (req, res) => {
	res.send("Welcome to Brekk.");
});

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

const Employee = mongoose.model("employee", EmployeeSchema);

app.get("/api/employees", async (req, res) => {
	const employees = await Employee.find();
	res.send(employees);
});

app.post("/api/employees", async (req, res) => {
	try {
		const employeeData = req.body;
		const employee = new Employee(employeeData);
		const result = await employee.save();
		res.send(result);
	} catch (ex) {
		console.log("Errors: ", ex);
		res.send("Something has gone wrong.");
	}
});

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}...`);
});
