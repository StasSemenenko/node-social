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
	color: {
		type: String,
		required: true,
		default: "black"
	},
	content: {
		type: String
	},
	img: {
		type: String
	},
	likes:[{
		type: mongoose.Types.ObjectId,
		ref: "users"
	}],	
	date: {
		type: Date,
		required: true,
		default: () => new Date()
	}
},{
	versionKey: false
});

module.exports = mongoose.model("posts", PostSchema);