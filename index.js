const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectToDB } = require("./utility/database");

app.use(express.json());

//Routes
const home = require("./routes/home");
const employee = require("./routes/employee");
app.use("/", home);
app.use("/api/employee", employee);

connectToDB();

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}...`);
});
