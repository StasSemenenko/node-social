const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	post: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model("posts", PostSchema);