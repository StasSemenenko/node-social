const {Schema, model} = require("mongoose")

const UsersSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	img: {
		type: String,
		default: "https://i.pinimg.com/originals/78/09/98/780998409b52ce6887ce2ed101709033.png"
	},
	info: {
		type: String,
		required: true,
		default: "Этот пользователь еще не заполнил профиль"
	}

},{
	versionKey: false
});

module.exports = model("users", UsersSchema);