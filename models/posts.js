const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	author: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true
	},
	name: {
		type: String,
		required: true
	},
	color_text: {
		type: String,
		required: true
	},
	color_fon: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	
	date: {
		type: Date,
		required: true,
		default: () => new Date()
	},
},{
	versionKey: false
});

module.exports = mongoose.model("posts", PostSchema);