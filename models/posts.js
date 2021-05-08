const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("posts", PostSchema);