const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(config.mongo, {
	useUnifiedTopology:true,
	useNewUrlParser: true
}).then(() => {
	console.log("Mongodb success connected");
}).catch(() => {
	console.log("Mongodb error");
});

