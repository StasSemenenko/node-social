const mongoose = require("mongosse");

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("posts", PostSchema);