const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
	post_id: {
		type: String
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true
	},
	img: {
		type: String,
	},
	here: {
		type: String
	}
	
},{
	versionKey: false
});

module.exports = mongoose.model("likes", LikeSchema);