const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
	post: {
		type: mongoose.Types.ObjectId,
		ref: "posts",
		required: true
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true
	},
	comment: {
		type: String,
		ref: "posts",
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

module.exports = mongoose.model("comments", CommentsSchema);