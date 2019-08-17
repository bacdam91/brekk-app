const mongoose = require("mongoose");
const config = require("config");

const DB_USERNAME = config.get("db.username");
const DB_PASSWORD = config.get("db.password");

mongoose.set("useFindAndModify", false);

module.exports.connectToDB = async function() {
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
};
